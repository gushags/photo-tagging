// Homepage.jsx

import GameImage from '../components/GameImage/GameImage';
import Navigation from '../components/Navigation/Navigation';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';
import StartScreen from '../components/StartScreen/StartScreen';
import style from './Homepage.module.css';
const API_URL = import.meta.env.VITE_API_URL;

import { useState, useEffect } from 'react';

function Homepage() {
  const [playerId, setPlayerId] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(true);
  const [targetCircles, setTargetCircles] = useState([]);

  // allow grayed out versions of icons
  const [grayStates, setGrayStates] = useState({
    bull: false,
    duck: false,
    gnome: false,
    poe: false,
    man: false,
  });

  useEffect(() => {
    if (loading || start || stopTimer || !gameStartTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
      setTimer(elapsed);
    }, 250); // smooth + accurate

    return () => clearInterval(interval);
  }, [loading, start, stopTimer, gameStartTime]);

  return (
    <>
      <div className={style.mainWrapper}>
        <Navigation
          grayStates={grayStates}
          start={start}
          timer={timer}
          setTimer={setTimer}
          stopTimer={stopTimer}
          loading={loading}
          setLoading={setLoading}
        />
        {start && (
          <StartScreen
            setStart={setStart}
            playerId={playerId}
            setPlayerId={setPlayerId}
            setGameStartTime={setGameStartTime}
          />
        )}
        <GameImage
          playerId={playerId}
          targetCircles={targetCircles}
          setTargetCircles={setTargetCircles}
          grayStates={grayStates}
          setGrayStates={setGrayStates}
          start={start}
          setStart={setStart}
          setTimer={setTimer}
          stopTimer={stopTimer}
          setStopTimer={setStopTimer}
          loading={loading}
          setLoading={setLoading}
        />
        {stopTimer && (
          <Leaderboard
            playerId={playerId}
            setPlayerId={setPlayerId}
            stopTimer={stopTimer}
            setTimer={setTimer}
            setStopTimer={setStopTimer}
            setStart={setStart}
            setGrayStates={setGrayStates}
            setTargetCircles={setTargetCircles}
            setGameStartTime={setGameStartTime}
          />
        )}
      </div>
    </>
  );
}

export default Homepage;
