// StartScreen.jsx

import { useEffect, useState } from 'react';
import style from './StartScreen.module.css';

function StartScreen({ setStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    // Trigger fade-out
    setVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(() => setStart(false), 500);
  };

  return (
    <>
      <div className={`${style.overlay} ${visible ? style.show : ''}`}>
        <div className={style.articleContainer}>
          <h2>How to Play</h2>
          <p>Edgar and his friends are hidden in the library.</p>
          <p>When you find them, click on the image to select it.</p>
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
