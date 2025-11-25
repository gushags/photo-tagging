// ChooseImage.jsx

import style from './ChooseImage.module.css';
import { getPopupPosition } from '../../utils/util';

function ChooseImage({
  dimension,
  currentCircle,
  setSelection,
  coordinates,
  setTargetCircles,
  targetCircles,
}) {
  const popupWidth = 250;
  const popupHeight = 200;

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

  const handleSuccess = () => {
    setSelection(false); // Close window
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
        This is the pop-up box.
        <div>X: {coordinates.x}</div>
        <div>Y: {coordinates.y}</div>
        <button onClick={clearCircle}>Cancel</button>
        <button onClick={handleSuccess}>Success!</button>
      </div>
    </>
  );
}

export default ChooseImage;
