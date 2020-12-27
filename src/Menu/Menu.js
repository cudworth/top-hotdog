import './Menu.css';

function Menu(props) {
  const { isVisible, images } = props.state;

  return (
    <div className={isVisible ? 'Menu' : 'Menu-hidden'}>
      {Object.keys(images).map((key) => {
        return (
          <input
            key={key}
            type="button"
            value={images[key].title}
            onClick={(e) => {
              props.onClick({ e, key });
            }}
          ></input>
        );
      })}
    </div>
  );
}

export default Menu;
