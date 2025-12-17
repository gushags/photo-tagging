// Leaderboard.jsx

import { useEffect, useState } from 'react';
import style from './Leaderboard.module.css';
const API_URL = import.meta.env.VITE_API_URL;

function Leaderboard({
  setPlayerId,
  setTimer,
  stopTimer,
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
    { name: 'Anonymous', score: '01:17' },
    { name: 'Amber', score: '02:07' },
    { name: 'Sam', score: '02:17' },
    { name: 'Elliot', score: '02:25' },
  ];

  useEffect(() => {
    if (stopTimer) {
      async function getLeaderboard() {
        try {
          const response = await fetch(API_URL + `/players`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          console.log(result);
          if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        } catch (error) {
          console.log(error);
        }
      }
      getLeaderboard();
    }
  }, [stopTimer]);

  const handleNewPlay = async () => {
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

    try {
      const response = await fetch(API_URL + `/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setPlayerId(result.data.id);
      console.log(result); // See if it sends my json
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    } catch (error) {
      console.log(error);
    }
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
