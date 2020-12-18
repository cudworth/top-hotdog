import './App.css';
import Header from './Header/Header';
//import Footer from './Footer/Footer';
import Image from './Image/Image';
import Popup from './Popup/Popup';
import cloneDeep from 'lodash/cloneDeep';

import localImage from './assets/food-2379472_1920.jpg';

import { useState } from 'react';

//Data format y-coord, x-coord, radius normalized for image height
const myImage = {
  url: localImage,
  dogs: [
    { y: 0.32355555555555554, x: 1.0844444444444445, r: 0.12 },
    { y: 0.128, x: 1.408, r: 0.12 },
    { y: 0.48355555555555557, x: 1.5715555555555556, r: 0.12 },
    { y: 0.8924444444444445, x: 1.4151111111111112, r: 0.12 },
  ],
};

function App() {
  const [state, setState] = useState({
    dogsFound: [].fill(false, 0, myImage.dogs.length),
    dogs: myImage.dogs,
    popup: { visible: false, hotdog: false },
  });

  function isHotDog(coords, hotdogs) {
    const [y1, x1] = coords;
    const arr = hotdogs.map((hotdog) => {
      const { y, x, r } = hotdog;
      const r1 = ((y1 - y) ** 2 + (x1 - x) ** 2) ** (1 / 2);
      return r1 < r ? true : false;
    });
    return arr;
  }

  function onImageClick(e) {
    //get click coordinates relative to page
    const rect = e.target.getBoundingClientRect();

    //Calc click location within element, normalized for image height
    //scale = rect.height;
    const normY = (e.pageY - rect.top - window.scrollY) / rect.height;
    const normX = (e.pageX - rect.left - window.scrollX) / rect.height;
    const coords = [normY, normX];
    //console.log(coords);

    setState((prev) => {
      const next = cloneDeep(prev);
      next.scale = rect.height;
      const hits = isHotDog(coords, myImage.dogs);
      hits.forEach((hit, i) => {
        if (hit && !next.dogsFound[i]) {
          next.dogsFound[i] = true;
        }
      });

      next.popup.visible = true;
      next.popup.hotdog = hits.includes(true) ? true : false;

      return next;
    });
  }

  function onPopupClick(e) {
    setState((prev) => {
      const next = cloneDeep(prev);
      next.popup.visible = false;
      return next;
    });
  }

  return (
    <div className="App">
      <Header></Header>
      <Image
        url={myImage.url}
        handleClick={onImageClick}
        scale={state.scale}
        dogs={state.dogs}
        dogsFound={state.dogsFound}
      ></Image>
      <Popup popup={state.popup} onClick={onPopupClick}></Popup>
    </div>
  );
}

export default App;
