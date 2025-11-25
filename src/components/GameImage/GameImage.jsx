// GameImage.jsx

import { useState } from 'react';
import ChooseImage from '../ChooseImage/ChooseImage';
import style from './GameImage.module.css';

function GameImage() {
  const [selection, setSelection] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [currentCircle, setCurrentCircle] = useState();
  const [targetCircles, setTargetCircles] = useState([]);

  const registerPosition = (event) => {
    const e = event.currentTarget;
    const dimension = e.getBoundingClientRect();
    console.log('Dimension: ', dimension);
    const x = event.clientX - dimension.left;
    const y = event.clientY - dimension.top;
    return [x, y, dimension];
  };

  const addTarget = (event) => {
    // get click coordinates
    let [x, y, dimension] = registerPosition(event);
    console.log({ x: x, y: y });

    // make new svg circle element
    const newCircle = {
      // id: crypto.randomUUID(),
      id: targetCircles.length + 1,
      x,
      y,
    };
    setCurrentCircle(newCircle);
    setTargetCircles([...targetCircles, newCircle]);
    showChoicesBox(newCircle, dimension);
  };

  const showChoicesBox = (newCircle, dimension) => {
    console.log('Dimension:', dimension);
    console.log(newCircle);
    setCoordinates({ x: newCircle.x, y: newCircle.y });
    setSelection(true);
  };

  return (
    <>
      <section className={style.gamePhoto} onClick={addTarget}>
        {targetCircles.map((circle) => (
          <div
            key={circle.id}
            className={style.circleWrapper}
            style={{ left: circle.x, top: circle.y }}
          >
            <svg height='100' width='100'>
              <circle
                cx='50'
                cy='50'
                r='25'
                stroke='green'
                strokeWidth='3'
                fill='white'
                fillOpacity='0.4'
              />
            </svg>
          </div>
        ))}
        {selection && (
          <ChooseImage
            currentCircle={currentCircle}
            setSelection={setSelection}
            coordinates={coordinates}
            targetCircles={targetCircles}
            setTargetCircles={setTargetCircles}
          />
        )}
      </section>
    </>
  );
}

export default GameImage;
