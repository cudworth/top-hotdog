import './Popup.css';
import hotdogImage from './hotdog.png';
import notHotdogImage from './nothotdog.png';

function Popup(props) {
  const { isVisible, hotdog } = props.state;
  return (
    <div
      className={[
        isVisible ? 'Popup' : 'Popup-hidden',
        hotdog ? 'Popup-hotdog' : 'Popup-not-hotdog',
      ].join(' ')}
      onClick={(e) => props.onClick(e)}
    >
      <div>{hotdog ? 'Hotdog!' : 'Not hotdog!'}</div>
      <img
        alt="Hotdog or not hotdog icon"
        src={hotdog ? hotdogImage : notHotdogImage}
      ></img>
    </div>
  );
}

export default Popup;
