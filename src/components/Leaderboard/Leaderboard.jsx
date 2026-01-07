// Leaderboard.jsx

import { useEffect, useState } from 'react';
import style from './Leaderboard.module.css';
const API_URL = import.meta.env.VITE_API_URL;
import { formatTime } from '../../utils/util';

function Leaderboard({
  setPlayerId,
  playerId,
  setTimer,
  stopTimer,
  setStopTimer,
  setStart,
  setGrayStates,
  setTargetCircles,
  setGameStartTime,
}) {
  const [visible, setVisible] = useState(false);
  const [scores, setScores] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

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
    setPlayerName('');
    setNameSubmitted(false);
    setGameStartTime(Date.now());

    try {
      const response = await fetch(API_URL + `/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setPlayerId(result.data.id);
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    } catch (error) {
      console.log(error);
    }
  };

  const submitName = async () => {
    const trimmed = playerName.trim();

    if (!trimmed) {
      setNameSubmitted(true); // accept Anonymous and close input
      return;
    }

    try {
      const response = await fetch(`${API_URL}/players/${playerId}/name`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update name');
      }

      setNameSubmitted(true);

      // Update leaderboard locally so no refetch needed
      setScores((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, name: playerName.trim() } : p
        )
      );
    } catch (err) {
      console.error(err);
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
                  <li key={p.id}>
                    {p.id === playerId && !nameSubmitted ? (
                      <div className={style.scores}>
                        <input
                          key={`name-input-${playerId}`}
                          placeholder='Enter your name'
                          className={style.name}
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitName();
                              e.target.blur();
                            }
                          }}
                          autoFocus
                          maxLength={20}
                        />
                        <span className={style.dots}></span>
                        <span className={style.score}>
                          {formatTime(p.time)}
                        </span>
                      </div>
                    ) : (
                      <div className={style.scores}>
                        <span className={style.name}>{p.name}</span>
                        <span className={style.dots}></span>
                        <span className={style.score}>
                          {formatTime(p.time)}
                        </span>
                      </div>
                    )}
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
