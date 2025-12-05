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
    setTimeout(() => {
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    }, 1000); // Delay to allow previous popup to close
  }, []);

  return (
    <>
      <div className={`${style.overlay} ${visible ? style.show : ''}`}>
        <div className={style.articleContainer}>
          <div className={style.winner}>
            <h1>You WIN!</h1>
          </div>
          <div className={style.leaderboard}>
            <h2>Top Scores</h2>
            <ol>
              <li>Trent ...... 00:45</li>
              <li>Bill ...... 00:55</li>
              <li>Amber ...... 01:05</li>
              <li>Jeff ...... 01:07</li>
              <li>Jeff ...... 01:07</li>
              <li>Jeff ...... 01:09</li>
              <li>Jeff ...... 01:17</li>
              <li>Amber ...... 02:07</li>
              <li>Sam ...... 02:17</li>
              <li>Elliot ...... 02:25</li>
            </ol>
            <button onClick={handleNewPlay}>Play Again</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
