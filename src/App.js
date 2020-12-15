//import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
//import Footer from './Footer/Footer';
import Image from './Image/Image';

import sampleImage from './assets/food-2379472_1920.jpg';

function onImageClick(e) {
  //get click coordinates relative to page
  const rect = e.target.getBoundingClientRect();

  //Calc click location within element, normalized for image height
  const unit = rect.height;
  const pLeft = (e.pageX - rect.left - window.scrollX) / unit;
  const pTop = (e.pageY - rect.top - window.scrollY) / unit;
  return [pTop, pLeft];
}

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Image url={sampleImage} handleClick={onImageClick}></Image>
    </div>
  );
}

export default App;

/*
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
*/
