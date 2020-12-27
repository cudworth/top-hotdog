import { useEffect } from 'react';
import './Image.css';

function Image(props) {
  const { isVisible, url, scale, dogsFound, data } = props.state;

  useEffect(() => {
    drawCircles();
  });

  function drawCircles() {
    const c = document.querySelector('canvas');
    const img = document.querySelector('img');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    dogsFound.forEach((dogFound, i) => {
      if (dogFound) {
        const { y, x, r } = data.dogs[i];
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
      <div>
        <img src={url} alt="[Various foods]"></img>
        <canvas
          onClick={(e) => {
            props.onClick(e);
          }}
        ></canvas>
      </div>
    </div>
  );
}

export default Image;
