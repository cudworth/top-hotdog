import './Menu.css';

function Menu(props) {
  const { isVisible } = props.state;
  const images = props.images;

  return (
    <div className={isVisible ? 'Menu' : 'Menu-hidden'}>
      <div>
        <h2>Select an image to play!</h2>
      </div>
      <div>
        {Object.keys(images).map((key) => {
          return (
            <input
              key={key}
              type="button"
              value={images[key].title}
              onClick={(e) => {
                e.preventDefault();
                props.onClick({ key });
              }}
            ></input>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
