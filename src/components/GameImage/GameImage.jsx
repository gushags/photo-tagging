// GameImage.jsx

import { useState } from 'react';
import ChooseImage from '../ChooseImage/ChooseImage';
import style from './GameImage.module.css';

function GameImage() {
  const [selection, setSelection] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dimension, setDimension] = useState();
  const [currentCircle, setCurrentCircle] = useState();
  const [targetCircles, setTargetCircles] = useState([]);

  const registerPosition = (event) => {
    const e = event.currentTarget;
    const dim = e.getBoundingClientRect();
    setDimension(dim);
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    return [x, y];
  };

  const addTarget = (event) => {
    // get click coordinates
    if (selection) return;
    let [x, y] = registerPosition(event);

    console.log({ x: x, y: y });

    // make new svg circle element
    const newCircle = {
      id: targetCircles.length + 1,
      x,
      y,
    };
    setCurrentCircle(newCircle);
    setTargetCircles([...targetCircles, newCircle]);
    showChoicesBox(newCircle);
  };

  const showChoicesBox = (newCircle) => {
    if (selection) return; // ignore clicks on background if already selected
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
            dimension={dimension}
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
