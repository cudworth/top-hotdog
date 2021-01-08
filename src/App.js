import './App.css';
import Header from './Header/Header';
//import Footer from './Footer/Footer';
import Image from './Image/Image';
import Popup from './Popup/Popup';
import Menu from './Menu/Menu';
import Scores from './Scores/Scores';
import EntryForm from './EntryForm/EntryForm';
import firebaseModule from './firebaseModule';
import { cloneDeep } from 'lodash';

import { useEffect, useState } from 'react';

const myFirebase = firebaseModule();

const defaultState = {
  popup: { isVisible: false, hotdog: false },
  menu: { isVisible: true },
  image: {
    isVisible: false,
    key: null,
    url: null,
    scale: null,
    dogsFound: [false],
    data: {},
    startTime: null,
    finishTime: null,
  },
  entryForm: { isVisible: false, completionTime: null },
  scores: { isVisible: false },
};

const serverData = { images: {}, scores: [] };

function App() {
  const [state, setState] = useState(cloneDeep(defaultState));

  useEffect(() => {
    getServerData();
  }, []);

  function getServerData() {
    myFirebase.read('images').then((images) => {
      const asyncTasks = Object.keys(images).map((key) => {
        return myFirebase.getDownloadURL(images[key].gs).then((url) => {
          images[key].url = url;
        });
      });

      Promise.all(asyncTasks).then(() => {
        serverData.images = images;
        setState((prev) => {
          return { ...prev };
        });
      });
    });
  }

  function resetApp() {
    setState(cloneDeep(defaultState));
  }

  function isHotDog(coords, hotdogs) {
    const [y1, x1] = coords;
    const arr = hotdogs.map((hotdog) => {
      const { y, x, r } = hotdog;
      const r1 = ((y1 - y) ** 2 + (x1 - x) ** 2) ** (1 / 2);
      return r1 < r ? true : false;
    });
    return arr;
  }

  function handleImageClick(e) {
    //get click coordinates relative to page
    const rect = e.target.getBoundingClientRect();

    //Calc click location within element, normalized for image height
    const normY = (e.pageY - rect.top - window.scrollY) / rect.height;
    const normX = (e.pageX - rect.left - window.scrollX) / rect.height;
    const coords = [normY, normX];
    //console.log(coords);

    setState((prev) => {
      const next = { ...prev };
      next.image.scale = rect.height;
      const hits = isHotDog(coords, serverData.images[state.image.key].dogs);
      hits.forEach((hit, i) => {
        if (hit) {
          next.image.dogsFound[i] = true;
        }
      });

      //Check if all hotdogs are found in the image
      if (!state.image.dogsFound.includes(false)) {
        next.image.finishTime = Date.now();
        next.image.isVisible = false;
        next.entryForm.isVisible = true;
        next.entryForm.completionTime =
          Math.floor((next.image.finishTime - next.image.startTime) / 100) / 10;
      } else {
        next.popup.isVisible = true;
        next.popup.hotdog = hits.includes(true) ? true : false;
      }

      return next;
    });
  }

  function handlePopupClick(e) {
    setState((prev) => {
      const next = { ...prev };
      next.popup.isVisible = false;
      return next;
    });
  }

  function handleMenuClick(args) {
    const { key } = args;
    const startTime = Date.now();

    myFirebase.getDownloadURL(serverData.images[key].gs).then((url) => {
      setState((prev) => {
        const next = { ...prev };
        next.menu.isVisible = false;
        next.image.isVisible = true;
        next.image.key = key;
        //next.image.data = serverData.images[key];
        next.image.url = url;
        next.image.dogsFound = Array(serverData.images[key].dogs.length).fill(
          false
        );
        next.image.startTime = startTime;

        return next;
      });
    });
  }

  function handleFormSubmit(args) {
    const { userName } = args;
    myFirebase
      .create('high-scores', {
        imageID: state.image.key,
        time: state.entryForm.completionTime,
        user: userName ? userName : 'Anon',
      })
      .then(() => {
        return getHighScores(state.image.key);
      })
      .then(() => {
        setState((prev) => {
          const next = { ...prev };
          next.entryForm.isVisible = false;
          next.scores.isVisible = true;
          return next;
        });
      });
  }

  function getHighScores(imageID) {
    return myFirebase.read('high-scores').then((data) => {
      const arr = [];
      Object.keys(data).forEach((key) => {
        if ((data[key].imageID = imageID)) {
          arr.push(data[key]);
        }
      });
      arr.sort((a, b) => {
        return a.time - b.time;
      });
      serverData.scores = arr.slice(0, 10);
    });
  }

  return (
    <div className="App">
      <Header></Header>
      <Image
        state={state.image}
        images={serverData.images}
        onClick={handleImageClick}
      ></Image>
      <Popup state={state.popup} onClick={handlePopupClick}></Popup>
      <Menu
        state={state.menu}
        images={serverData.images}
        onClick={handleMenuClick}
      ></Menu>
      <EntryForm state={state.entryForm} onClick={handleFormSubmit}></EntryForm>
      <Scores
        state={state.scores}
        scores={serverData.scores}
        onClick={resetApp}
      ></Scores>
    </div>
  );
}

export default App;
