import './App.css';
import Header from './Header/Header';
//import Footer from './Footer/Footer';
import Image from './Image/Image';
import Popup from './Popup/Popup';
import Menu from './Menu/Menu';
import Scores from './Scores/Scores';
import EntryForm from './EntryForm/EntryForm';
import firebaseModule from './firebaseModule';

import { useEffect, useState } from 'react';

const myFirebase = firebaseModule();

function App() {
  const [state, setState] = useState({
    popup: { isVisible: false, hotdog: false },
    menu: { isVisible: true, images: {} },
    image: {
      isVisible: false,
      url: null,
      scale: null,
      dogsFound: [false],
      data: {},
    },
    entryForm: { isVisible: false },
    scores: { isVisible: false },
  });

  useEffect(() => {
    console.log('All dogs found?: ', allHotdogsFound());
  });

  useEffect(() => {
    myFirebase.read('images').then((images) => {
      const asyncTasks = Object.keys(images).map((key) => {
        return myFirebase.getDownloadURL(images[key].gs).then((url) => {
          images[key].url = url;
        });
      });

      Promise.all(asyncTasks).then(() => {
        setState((prev) => {
          const next = { ...prev };
          next.menu.images = images;
          return next;
        });
      });
    });
  }, []);

  function isHotDog(coords, hotdogs) {
    const [y1, x1] = coords;
    const arr = hotdogs.map((hotdog) => {
      const { y, x, r } = hotdog;
      const r1 = ((y1 - y) ** 2 + (x1 - x) ** 2) ** (1 / 2);
      return r1 < r ? true : false;
    });
    return arr;
  }

  function allHotdogsFound() {
    return state.image.dogsFound.includes(false) ? false : true;
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
      const hits = isHotDog(coords, state.image.data.dogs);
      hits.forEach((hit, i) => {
        if (hit) {
          //&& !next.image.dogsFound[i]
          next.image.dogsFound[i] = true;
        }
      });

      next.popup.isVisible = true;
      next.popup.hotdog = hits.includes(true) ? true : false;

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
    const { e, key } = args;
    e.preventDefault();

    myFirebase.getDownloadURL(state.menu.images[key].gs).then((url) => {
      setState((prev) => {
        const next = { ...prev };
        next.menu.isVisible = false;
        next.image.isVisible = true;
        next.image.data = next.menu.images[key];
        next.image.url = url;
        next.image.dogsFound = Array(next.menu.images[key].dogs.length).fill(
          false
        );

        return next;
      });
    });
  }

  return (
    <div className="App">
      <Header></Header>
      <Image state={state.image} onClick={handleImageClick}></Image>
      <Popup state={state.popup} onClick={handlePopupClick}></Popup>
      <Menu state={state.menu} onClick={handleMenuClick}></Menu>
      <EntryForm state={state.entryForm}></EntryForm>
      <Scores state={state.scores}></Scores>
    </div>
  );
}

export default App;
