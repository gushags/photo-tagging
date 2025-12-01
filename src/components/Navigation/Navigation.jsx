// Navigation.jsx

import style from './Navigation.module.css';
import { useEffect } from 'react';
import { formatTime } from '../../utils/util';

function Navigation({ grayStates, timer, setTimer }) {
  useEffect(() => {
    setTimeout(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  }, [timer, setTimer]);

  return (
    <>
      <nav className={style.navigation}>
        <div>This is the naviation</div>
        <div className={style.container}>
          <div>
            <img
              id='bull'
              className={!grayStates.bull ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/bull.jpg'
              alt='Bull Squishy'
            />
            <img
              id='duck'
              className={!grayStates.duck ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/duck.jpg'
              alt='Danny Duck'
            />
            <img
              id='gnome'
              className={
                !grayStates.gnome ? style.grayscale : style.noGrayscale
              }
              src='src/assets/waldos/gnome.jpg'
              alt='Gnomeo'
            />
            <img
              id='poe'
              className={!grayStates.poe ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/poe.jpg'
              alt='Edgar Allen Poe'
            />
            <img
              id='man'
              className={!grayStates.man ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/purple-man.jpg'
              alt='Purple Man'
            />
          </div>
          <div>
            <h3>Timer: {formatTime(timer)}</h3>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
