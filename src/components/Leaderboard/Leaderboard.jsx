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

  const scores = [
    { name: 'Trent', score: '00:55' },
    { name: 'Amber', score: '01:05' },
    { name: 'Jeff', score: '01:07' },
    { name: 'Jeff', score: '01:08' },
    { name: 'Jeff', score: '01:09' },
    { name: 'Jeff', score: '01:17' },
    { name: 'Amber', score: '02:07' },
    { name: 'Sam', score: '02:17' },
    { name: 'Elliot', score: '02:25' },
  ];

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
              {scores &&
                scores.map((p) => (
                  <li>
                    <div className={style.scores}>
                      <span className={style.name}>{p.name}</span>
                      <span className={style.dots}></span>
                      <span className={style.score}>{p.score}</span>
                    </div>
                  </li>
                ))}
            </ol>
            <button onClick={handleNewPlay}>Play Again</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
