// Homepage.jsx

import GameImage from '../components/GameImage/GameImage';
import Navigation from '../components/Navigation/Navigation';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';
import StartScreen from '../components/StartScreen/StartScreen';
import style from './Homepage.module.css';

import { useState } from 'react';

function Homepage() {
  // allow grayed out versions of icons
  const [grayStates, setGrayStates] = useState({
    bull: true,
    duck: true,
    gnome: true,
    poe: true,
    man: true,
  });
  const [playerId, setPlayerId] = useState(null);
  const [timer, setTimer] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(true);
  const [targetCircles, setTargetCircles] = useState([]);

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
          />
        )}
      </div>
    </>
  );
}

export default Homepage;
