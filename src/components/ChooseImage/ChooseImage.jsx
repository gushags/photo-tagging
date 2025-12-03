// ChooseImage.jsx

import style from './ChooseImage.module.css';
import { useState, useRef, useEffect } from 'react';
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
  setStopTimer,
}) {
  const [failColor, setFailColor] = useState(false);
  const [closePopup, setClosePopup] = useState(false);
  const [shake, setShake] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const timeoutRef = useRef(null);

  const popupWidth = 290;
  const popupHeight = 400;

  const { left: xPos, top: yPos } = getPopupPosition(
    coordinates.x,
    coordinates.y,
    popupWidth,
    popupHeight,
    dimension
  );

  useEffect(() => {
    return () => {
      // cleanup any pending timers on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCancel = () => {
    clearCircle();
    setSelection(false);
  };

  const clearCircle = () => {
    const updatedCircles = targetCircles.filter(
      (circle) => circle.id !== currentCircle.id
    );
    setTargetCircles(updatedCircles);
  };

  const handleSuccess = (id) => {
    // update grayscale state
    setGrayStates((prevState) => {
      const updated = {
        ...prevState,
        [id]: !prevState[id],
      };
      // Stop timer if all pictures found
      const hasTrue = Object.values(updated).some((value) => value === true);
      if (!hasTrue) setStopTimer(true);

      return updated;
    });

    // trigger success animation
    setSuccessAnimation(true);

    // small delay so user sees the green flash, then start fade
    timeoutRef.current = setTimeout(() => {
      // MATCH this duration to the CSS transition length (see .choicesBox transition)
      timeoutRef.current = setTimeout(() => {
        // setClosePopup(true);
        setSelection(false); // close popup
        setSuccessAnimation(false); // reset for next time
      }, 900);
    }, 500);
  };

  const startFailCloseSequence = () => {
    setFailColor(true);
    clearCircle();
    setShake(true); // <-- start shaking

    // stop shaking after animation duration
    setTimeout(() => setShake(false), 400);

    // small delay so user sees the red flash, then start fade
    timeoutRef.current = setTimeout(() => {
      setClosePopup(true); // adds the fadeout class (opacity -> 0)

      // wait for the fade transition to finish, then remove the circle and reset
      // MATCH this duration to the CSS transition length (see .choicesBox transition)
      timeoutRef.current = setTimeout(() => {
        clearCircle();
        setFailColor(false);
        setClosePopup(false); // reset in case component reused
        setSelection(false);
      }, 600);
    }, 500); // time to display red before fading
  };

  const checkTargetPosition = (circleX, circleY, objX, objY, objID) => {
    if (checkCoordinatesForPic(circleX, circleY, objX, objY, dimension)) {
      console.log('success');
      handleSuccess(objID);
    } else {
      // change hover color if false
      // add slow transition
      startFailCloseSequence();
    }
  };

  return (
    <>
      <div
        className={`${style.choicesBox} ${closePopup ? style.fadeout : ''} ${
          failColor ? style.failBox : ''
        } ${shake ? style.shake : ''} ${
          successAnimation ? style.successBox : ''
        }`}
        style={{
          left: xPos,
          top: yPos,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={!failColor ? style.items : style.itemsFail}
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
          <img src='src/assets/waldos/purple-man.png' alt='purple-man' />
          <p>Purple Paulie</p>
        </div>
        <div
          className={!failColor ? style.items : style.itemsFail}
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
          <img src='src/assets/waldos/bull.png' alt='bull' />
          <p>Bull Squishy</p>
        </div>
        <div
          className={!failColor ? style.items : style.itemsFail}
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
          <img src='src/assets/waldos/duck.png' alt='duck' />
          <p>Danny Duck</p>
        </div>
        <div
          className={!failColor ? style.items : style.itemsFail}
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
          <img src='src/assets/waldos/gnome.png' alt='Edgar' />
          <p>Gnomeo</p>
        </div>
        <div
          className={!failColor ? style.items : style.itemsFail}
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
          <img src='src/assets/waldos/poe.png' alt='gnome' />
          <p>Edgar Allen Poe</p>
        </div>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
}

export default ChooseImage;
