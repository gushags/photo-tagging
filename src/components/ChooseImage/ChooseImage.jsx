// ChooseImage.jsx

import style from './ChooseImage.module.css';
import { useState, useRef, useEffect } from 'react';
import { getPopupPosition } from '../../utils/util';

const API_URL = import.meta.env.VITE_API_URL;

function ChooseImage({
  playerId,
  dimension,
  currentCircle,
  setSelection,
  coordinates,
  setTargetCircles,
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
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const clearCircle = () => {
    setTargetCircles((prev) =>
      prev.filter((circle) => circle.id !== currentCircle.id)
    );
  };

  const handleCancel = () => {
    clearCircle();
    setSelection(false);
  };

  const submitGuess = async (targetKey) => {
    try {
      const response = await fetch(`${API_URL}/players/${playerId}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetKey,
          clickX: coordinates.x,
          clickY: coordinates.y,
          dimension,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Guess failed');

      if (result.success) {
        setGrayStates((prev) => ({ ...prev, [targetKey]: true }));
        setSuccessAnimation(true);

        if (result.gameComplete) {
          setStopTimer(true);
        }

        timeoutRef.current = setTimeout(() => {
          setSelection(false);
          setSuccessAnimation(false);
        }, 900);
      } else {
        startFailCloseSequence();
      }
    } catch (err) {
      console.error(err);
      startFailCloseSequence();
    }
  };

  const startFailCloseSequence = () => {
    setFailColor(true);
    setShake(true);
    clearCircle();

    setTimeout(() => setShake(false), 400);

    timeoutRef.current = setTimeout(() => {
      setClosePopup(true);

      timeoutRef.current = setTimeout(() => {
        setFailColor(false);
        setClosePopup(false);
        setSelection(false);
      }, 600);
    }, 500);
  };

  useEffect(() => {
    if (!stopTimer) return;

    async function updatePlayer() {
      try {
        await fetch(`${API_URL}/players/${playerId}/stop`, {
          method: 'POST',
        });
      } catch (err) {
        console.error(err);
      }
    }

    updatePlayer();
  }, [stopTimer, playerId]);

  return (
    <div
      className={`${style.choicesBox}
        ${closePopup ? style.fadeout : ''}
        ${failColor ? style.failBox : ''}
        ${shake ? style.shake : ''}
        ${successAnimation ? style.successBox : ''}
      `}
      style={{ left: xPos, top: yPos }}
      onClick={(e) => e.stopPropagation()}
    >
      <Choice
        label='Edgar Allan Poe'
        img='src/assets/waldos/poe.png'
        disabled={grayStates.poe}
        onClick={() => submitGuess('poe')}
      />

      <Choice
        label='Bull Squishy'
        img='src/assets/waldos/bull.png'
        disabled={grayStates.bull}
        onClick={() => submitGuess('bull')}
      />

      <Choice
        label='Danny Duck'
        img='src/assets/waldos/duck.png'
        disabled={grayStates.duck}
        onClick={() => submitGuess('duck')}
      />

      <Choice
        label='Gnomeo'
        img='src/assets/waldos/gnome.png'
        disabled={grayStates.gnome}
        onClick={() => submitGuess('gnome')}
      />

      <Choice
        label='Purple Paulie'
        img='src/assets/waldos/purple-man.png'
        disabled={grayStates.man}
        onClick={() => submitGuess('man')}
      />

      <button className={style.cancel} onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

function Choice({ label, img, disabled, onClick }) {
  return (
    <div
      className={`${style.items} ${disabled ? style.disableItem : ''}`}
      onClick={!disabled ? onClick : undefined}
    >
      <img src={img} alt={label} className={disabled ? style.grayImg : ''} />
      <p>{label}</p>
    </div>
  );
}

export default ChooseImage;
