// ChooseImage.jsx

import style from './ChooseImage.module.css';

function ChooseImage({
  currentCircle,
  setSelection,
  coordinates,
  setTargetCircles,
  targetCircles,
}) {
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
          top: coordinates.y,
          left: coordinates.x,
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
