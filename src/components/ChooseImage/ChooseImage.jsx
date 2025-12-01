// ChooseImage.jsx

import style from './ChooseImage.module.css';
import {
  manObject,
  bullObj,
  duckObj,
  gnomeObj,
  poeObj,
} from '../../../api/data';
import { getPopupPosition, checkCoordinatesForPic } from '../../utils/util';

function ChooseImage({
  dimension,
  currentCircle,
  setSelection,
  coordinates,
  setTargetCircles,
  targetCircles,
  setGrayStates,
}) {
  const popupWidth = 290;
  const popupHeight = 400;

  const { left: xPos, top: yPos } = getPopupPosition(
    coordinates.x,
    coordinates.y,
    popupWidth,
    popupHeight,
    dimension
  );

  const clearCircle = () => {
    const updatedCircles = targetCircles.filter(
      (circle) => circle.id !== currentCircle.id
    );
    setTargetCircles(updatedCircles);
    setSelection(false); // Close window
  };

  const handleSuccess = (id) => {
    // Eliminates grayscale on success
    setGrayStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setSelection(false); // Close window
  };

  const checkTargetPosition = (circleX, circleY, objX, objY, objID) => {
    // do something
    if (checkCoordinatesForPic(circleX, circleY, objX, objY, dimension)) {
      console.log('success');
      handleSuccess(objID);
    } else {
      clearCircle();
    }
  };

  return (
    <>
      <div
        className={style.choicesBox}
        style={{
          left: xPos,
          top: yPos,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={style.items}
          onClick={() =>
            checkTargetPosition(
              coordinates.x,
              coordinates.y,
              manObject.x,
              manObject.y,
              manObject.id
            )
          }
        >
          <img src='src/assets/waldos/purple-man.jpg' alt='purple-man' />
          <p>Purple Paulie</p>
        </div>
        <div
          className={style.items}
          onClick={() =>
            checkTargetPosition(
              coordinates.x,
              coordinates.y,
              bullObj.x,
              bullObj.y,
              bullObj.id
            )
          }
        >
          <img src='src/assets/waldos/bull.jpg' alt='bull' />
          <p>Bull Squishy</p>
        </div>
        <div
          className={style.items}
          onClick={() =>
            checkTargetPosition(
              coordinates.x,
              coordinates.y,
              duckObj.x,
              duckObj.y,
              duckObj.id
            )
          }
        >
          <img src='src/assets/waldos/duck.jpg' alt='duck' />
          <p>Danny Duck</p>
        </div>
        <div
          className={style.items}
          onClick={() =>
            checkTargetPosition(
              coordinates.x,
              coordinates.y,
              gnomeObj.x,
              gnomeObj.y,
              gnomeObj.id
            )
          }
        >
          <img src='src/assets/waldos/gnome.jpg' alt='Edgar' />
          <p>Gnomeo</p>
        </div>
        <div
          className={style.items}
          onClick={() =>
            checkTargetPosition(
              coordinates.x,
              coordinates.y,
              poeObj.x,
              poeObj.y,
              poeObj.id
            )
          }
        >
          <img src='src/assets/waldos/poe.jpg' alt='gnome' />
          <p>Edgar Allen Poe</p>
        </div>
        <button onClick={clearCircle}>Cancel</button>
      </div>
    </>
  );
}

export default ChooseImage;
