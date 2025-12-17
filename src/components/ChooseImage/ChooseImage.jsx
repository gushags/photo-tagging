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
const API_URL = import.meta.env.VITE_API_URL;

function ChooseImage({
  playerId,
  dimension,
  currentCircle,
  setSelection,
  coordinates,
  setTargetCircles,
  targetCircles,
  setGrayStates,
  grayStates,
  stopTimer,
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

  const handleSuccess = async (id) => {
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

    // if player wins, get the total time from db, not frontend timer

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

  useEffect(() => {
    async function updatePlayer() {
      if (stopTimer) {
        try {
          const response = await fetch(API_URL + `/players/${playerId}/stop`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          console.log(result); // See if it sends my json

          if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        } catch (error) {
          console.log(error);
        }
      }
    }
    updatePlayer();
  }, [stopTimer, playerId]);

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
          className={`{${!failColor ? style.items : style.itemsFail} ${
            !grayStates.poe ? style.disableItem : style.items
          }`}
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
          <img
            className={!grayStates.poe ? style.grayImg : ''}
            src='src/assets/waldos/poe.png'
            alt='gnome'
          />
          <p>Edgar Allen Poe</p>
        </div>

        <div
          className={`{${!failColor ? style.items : style.itemsFail} ${
            !grayStates.bull ? style.disableItem : style.items
          }`}
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
          <img
            className={!grayStates.bull ? style.grayImg : ''}
            src='src/assets/waldos/bull.png'
            alt='bull'
          />
          <p>Bull Squishy</p>
        </div>
        <div
          className={`{${!failColor ? style.items : style.itemsFail} ${
            !grayStates.duck ? style.disableItem : style.items
          }`}
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
          <img
            className={!grayStates.duck ? style.grayImg : ''}
            src='src/assets/waldos/duck.png'
            alt='duck'
          />
          <p>Danny Duck</p>
        </div>
        <div
          className={`{${!failColor ? style.items : style.itemsFail} ${
            !grayStates.gnome ? style.disableItem : style.items
          }`}
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
          <img
            className={!grayStates.gnome ? style.grayImg : ''}
            src='src/assets/waldos/gnome.png'
            alt='Gnomeo'
          />
          <p>Gnomeo</p>
        </div>
        <div
          className={`{${!failColor ? style.items : style.itemsFail} ${
            !grayStates.man ? style.disableItem : style.items
          }`}
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
          <img
            className={!grayStates.man ? style.grayImg : ''}
            src='src/assets/waldos/purple-man.png'
            alt='purple-man'
          />
          <p>Purple Paulie</p>
        </div>
        <button className={style.cancel} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default ChooseImage;
