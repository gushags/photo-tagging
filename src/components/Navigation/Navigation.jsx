// Navigation.jsx

import style from './Navigation.module.css';
import { useEffect, useRef } from 'react';
import { formatTime } from '../../utils/util';

function Navigation({
  grayStates,
  timer,
  setTimer,
  stopTimer,
  loading,
  start,
}) {
  const hasMounted = useRef(false);

  useEffect(() => {
    // Skip first render
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!stopTimer && !start) {
      setTimeout(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  }, [timer, setTimer, stopTimer, start]);

  return (
    <>
      <nav className={style.navigation}>
        <div className={style.container}>
          <h1>Where's Edgar?</h1>
          <div>
            <img
              id='poe'
              className={grayStates.poe ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/poe.png'
              alt='Edgar Allen Poe'
            />
            <img
              id='bull'
              className={grayStates.bull ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/bull.png'
              alt='Bull Squishy'
            />
            <img
              id='duck'
              className={grayStates.duck ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/duck.png'
              alt='Danny Duck'
            />
            <img
              id='gnome'
              className={grayStates.gnome ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/gnome.png'
              alt='Gnomeo'
            />

            <img
              id='man'
              className={grayStates.man ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/purple-man.png'
              alt='Purple Man'
            />
          </div>

          <div>
            <h2 className={style.novafont}>
              {!loading && !start ? formatTime(timer) : '00:00'}
            </h2>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
