// Leaderboard.jsx

import { useEffect, useState } from 'react';
import style from './Leaderboard.module.css';

function Leaderboard({
  setTimer,
  setStopTimer,
  setStart,
  setGrayStates,
  setTargetCircles,
}) {
  const [visible, setVisible] = useState(false);

  const handleNewPlay = () => {
    console.log('New Game');
    setVisible(false);
    setStart(false);
    setGrayStates({
      bull: true,
      duck: true,
      gnome: true,
      poe: true,
      man: true,
    });
    setTargetCircles([]);
    setTimer(0);
    setStopTimer(false);
  };

  useEffect(() => {
    // Trigger fade-in on mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`${style.overlay} ${visible ? style.show : ''}`}>
        <div className={style.articleContainer}>
          <h2>Top Scores</h2>
          <button onClick={handleNewPlay}>Play Again</button>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
