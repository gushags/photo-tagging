// GameImage.jsx

import { useState, useRef, useEffect } from 'react';
import ChooseImage from '../ChooseImage/ChooseImage';
import style from './GameImage.module.css';

function GameImage() {
  const [selection, setSelection] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const containerRef = useRef();
  const [dimension, setDimension] = useState();
  const [currentCircle, setCurrentCircle] = useState();
  const [targetCircles, setTargetCircles] = useState([]);

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimension({ width: rect.width, height: rect.height });
    }

    updateSize(); // set initial size
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const registerPosition = (event) => {
    const e = event.currentTarget;
    const dim = e.getBoundingClientRect();
    console.log('Dimension: ', dim);
    setDimension(dim);
    const xPercent = (event.clientX - dim.left) / dim.width;
    const yPercent = (event.clientY - dim.top) / dim.height;
    return [xPercent, yPercent];
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
      <section className={style.imageWrapper}>
        <img src='src/assets/library.jpg' alt='' />

        <div className={style.gamePhoto} ref={containerRef} onClick={addTarget}>
          {targetCircles.map((circle) => (
            <div
              key={circle.id}
              className={style.circleWrapper}
              // adjust circle if window changes
              style={{
                left: circle.x * dimension.width,
                top: circle.y * dimension.height,
              }}
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
        </div>
      </section>
      {/* <section
        ref={containerRef}
        className={style.gamePhoto}
        onClick={addTarget}
      >
        {targetCircles.map((circle) => (
          <div
            key={circle.id}
            className={style.circleWrapper}
            // adjust circle if window changes
            style={{
              left: circle.x * dimension.width,
              top: circle.y * dimension.height,
            }}
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
      </section> */}
    </>
  );
}

export default GameImage;
