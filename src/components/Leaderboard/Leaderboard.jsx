// Leaderboard.jsx

import { useEffect, useState } from 'react';
import style from './Leaderboard.module.css';
const API_URL = import.meta.env.VITE_API_URL;
import { formatTime } from '../../utils/util';

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
  const [scores, setScores] = useState([]);

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
          setScores(result.data);
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
      bull: false,
      duck: false,
      gnome: false,
      poe: false,
      man: false,
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
                    <div key={p.id} className={style.scores}>
                      <span className={style.name}>{p.name}</span>
                      <span className={style.dots}></span>
                      <span className={style.score}>{formatTime(p.time)}</span>
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
