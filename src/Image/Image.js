import './Image.css';

function Image(props) {
  return (
    <div className="Image">
      <img
        src={props.url}
        alt="[Various foods]"
        onClick={(e) => props.handleClick(e)}
      ></img>
    </div>
  );
}

export default Image;
