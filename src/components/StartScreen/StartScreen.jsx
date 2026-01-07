// StartScreen.jsx

import { useEffect, useState } from 'react';
import style from './StartScreen.module.css';
const API_URL = import.meta.env.VITE_API_URL;

function StartScreen({ setStart, setPlayerId, setGameStartTime }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    // Trigger fade-out
    setVisible(false);
    // Create new player
    try {
      const response = await fetch(API_URL + `/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result); // See if it sends my json
      setPlayerId(result.data.id); // playerId lets us update time on victory

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    } catch (error) {
      console.log(error);
    }

    // Wait for animation to finish before unmounting
    setTimeout(() => {
      setGameStartTime(Date.now());
      setStart(false);
    }, 500);
  };

  return (
    <>
      <div className={`${style.overlay} ${visible ? style.show : ''}`}>
        <div className={style.articleContainer}>
          <h2>How to Play</h2>
          <p>Edgar and his friends are hidden in the library.</p>
          <p>When you find one, click on their image to select it.</p>
          <p>Quickest wins!</p>
          <button className={style.start} onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default StartScreen;
