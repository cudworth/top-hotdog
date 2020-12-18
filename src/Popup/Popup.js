import './Popup.css';

function Popup(props) {
  const getClass = () => {
    if (!props.popup.visible) {
      return 'Popup-hidden';
    } else if (props.popup.hotdog) {
      return 'Popup-hotdog';
    } else {
      return 'Popup-not-hotdog';
    }
  };

  return (
    <div className={getClass()} onClick={(e) => props.onClick(e)}>
      {props.popup.hotdog ? 'Hotdog!' : 'Not hotdog!'}
    </div>
  );
}

export default Popup;
