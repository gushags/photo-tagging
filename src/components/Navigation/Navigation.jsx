// Navigation.jsx

import style from './Navigation.module.css';

function Navigation({ grayStates }) {
  return (
    <>
      <nav className={style.navigation}>
        <div>This is the naviation</div>
        <div className={style.iconContainer}>
          <img
            id='bull'
            className={grayStates.bull ? style.grayscale : style.noGrayscale}
            src='src/assets/waldos/bull.jpg'
            alt='Bull Squishy'
          />
          <img
            id='duck'
            className={grayStates.duck ? style.grayscale : style.noGrayscale}
            src='src/assets/waldos/duck.jpg'
            alt='Danny Duck'
          />
          <img
            id='gnome'
            className={grayStates.gnome ? style.grayscale : style.noGrayscale}
            src='src/assets/waldos/gnome.jpg'
            alt='Gnomeo'
          />
          <img
            id='poe'
            className={grayStates.poe ? style.grayscale : style.noGrayscale}
            src='src/assets/waldos/poe.jpg'
            alt='Edgar Allen Poe'
          />
          <img
            id='man'
            className={grayStates.man ? style.grayscale : style.noGrayscale}
            src='src/assets/waldos/purple-man.jpg'
            alt='Purple Man'
          />
        </div>
      </nav>
    </>
  );
}

export default Navigation;
