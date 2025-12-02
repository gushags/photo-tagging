// Navigation.jsx

import style from './Navigation.module.css';
import { useEffect } from 'react';
import { formatTime } from '../../utils/util';

function Navigation({ grayStates, timer, setTimer, stopTimer }) {
  useEffect(() => {
    if (!stopTimer) {
      setTimeout(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  }, [timer, setTimer, stopTimer]);

  return (
    <>
      <nav className={style.navigation}>
        <div>This is the navigation</div>
        <div className={style.container}>
          <div>
            <img
              id='bull'
              className={!grayStates.bull ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/bull.png'
              alt='Bull Squishy'
            />
            <img
              id='duck'
              className={!grayStates.duck ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/duck.png'
              alt='Danny Duck'
            />
            <img
              id='gnome'
              className={
                !grayStates.gnome ? style.grayscale : style.noGrayscale
              }
              src='src/assets/waldos/gnome.png'
              alt='Gnomeo'
            />
            <img
              id='poe'
              className={!grayStates.poe ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/poe.png'
              alt='Edgar Allen Poe'
            />
            <img
              id='man'
              className={!grayStates.man ? style.grayscale : style.noGrayscale}
              src='src/assets/waldos/purple-man.png'
              alt='Purple Man'
            />
          </div>
          <div>
            <h2 className={style.novafont}>{formatTime(timer)}</h2>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
