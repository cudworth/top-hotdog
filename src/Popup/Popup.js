import './Popup.css';
import hotdogImage from '../assets/hotdog.png';
import notHotdogImage from '../assets/nothotdog.png';

function Popup(props) {
  return (
    <div
      className={[
        props.popup.visible ? 'Popup' : 'Popup-hidden',
        props.popup.hotdog ? 'Popup-hotdog' : 'Popup-not-hotdog',
      ].join(' ')}
      onClick={(e) => props.onClick(e)}
    >
      <div>{props.popup.hotdog ? 'Hotdog!' : 'Not hotdog!'}</div>
      <img
        alt="Hotdog or not hotdog icon"
        src={props.popup.hotdog ? hotdogImage : notHotdogImage}
      ></img>
    </div>
  );
}

export default Popup;
