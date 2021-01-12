import { useEffect } from 'react';
import './Image.css';

function Image(props) {
  const { isVisible, url, scale, key, dogsFound } = props.state;
  const images = props.images;

  useEffect(() => {
    drawCircles();
  });

  function drawCircles() {
    const c = document.getElementById('Image-canvas');
    const img = document.getElementById('Image-img');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    dogsFound.forEach((dogFound, i) => {
      if (dogFound) {
        const { y, x, r } = images[key].dogs[i];
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, r * scale, 0, 2 * Math.PI);
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'chartreuse';
        ctx.stroke();
      }
    });
  }

  return (
    <div className={isVisible ? 'Image' : 'Image-hidden'}>
      <div className="Image-container">
        <img id="Image-img" src={url} alt="[Various foods]"></img>
        <canvas
          id="Image-canvas"
          onClick={(e) => {
            e.preventDefault();
            props.onClick(e);
          }}
        ></canvas>
      </div>
    </div>
  );
}

export default Image;
