// GameImage.jsx

import { useState } from 'react';
import style from './GameImage.module.css';

function GameImage() {
  const [targetCircles, setTargetCircles] = useState([]);

  const registerPosition = (event) => {
    const e = event.target;
    const dimension = e.getBoundingClientRect();
    console.log('Dimension: ', dimension);
    const x = event.clientX - dimension.left;
    const y = event.clientY - dimension.top;
    return [x, y];
  };

  const addTarget = (event) => {
    // get click coordinates
    let [x, y] = registerPosition(event);
    console.log({ x: x, y: y });

    // make new svg circle element
    const newCircle = {
      id: crypto.randomUUID(),
      x,
      y,
    };

    setTargetCircles((prev) => [...prev, newCircle]);
  };

  return (
    <>
      <section className={style.gamePhoto} onClick={addTarget}>
        {targetCircles.map((c) => (
          <div
            key={c.id}
            className={style.circleWrapper}
            style={{ left: c.x, top: c.y }}
          >
            <svg height='100' width='100'>
              <circle
                cx='50'
                cy='50'
                r='25'
                stroke='green'
                strokeWidth='3'
                fill='white'
                fill-opacity='0.4'
              />
            </svg>
          </div>
        ))}
      </section>
    </>
  );
}

export default GameImage;
