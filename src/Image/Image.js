import { useEffect } from 'react';
import './Image.css';

function Image(props) {
  useEffect(() => {
    drawCircles();
  });

  function drawCircles() {
    const c = document.querySelector('canvas');
    const img = document.querySelector('img');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    props.dogsFound.forEach((dogFound, i) => {
      if (dogFound) {
        const { y, x, r } = props.dogs[i];
        ctx.beginPath();
        ctx.arc(
          x * props.scale,
          y * props.scale,
          r * props.scale,
          0,
          2 * Math.PI
        );
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'chartreuse';
        ctx.stroke();
      }
    });
  }

  return (
    <div className="Image">
      <div>
        <img src={props.url} alt="[Various foods]"></img>
        <canvas onClick={(e) => props.handleClick(e)}></canvas>
      </div>
    </div>
  );
}

export default Image;
