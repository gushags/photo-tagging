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
          <p>Phasellus laoreet lorem vel dolor tempus vehicula.</p>
          <button onClick={handleStart}>Start</button>
        </div>
      </div>
    </>
  );
}

export default StartScreen;
