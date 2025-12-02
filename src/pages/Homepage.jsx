// Homepage.jsx

import GameImage from '../components/GameImage/GameImage';
import Navigation from '../components/Navigation/Navigation';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';

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
  const [timer, setTimer] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  return (
    <>
      <Navigation
        grayStates={grayStates}
        timer={timer}
        setTimer={setTimer}
        stopTimer={stopTimer}
      />
      <GameImage
        grayStates={grayStates}
        setGrayStates={setGrayStates}
        setTimer={setTimer}
        stopTimer={stopTimer}
        setStopTimer={setStopTimer}
      />
      {stopTimer && <Leaderboard />}
    </>
  );
}

export default Homepage;
