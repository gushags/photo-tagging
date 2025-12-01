// Homepage.jsx

import GameImage from '../components/GameImage/GameImage';
import Navigation from '../components/Navigation/Navigation';
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
  return (
    <>
      <Navigation grayStates={grayStates} timer={timer} setTimer={setTimer} />
      <GameImage
        grayStates={grayStates}
        setGrayStates={setGrayStates}
        setTimer={setTimer}
      />
    </>
  );
}

export default Homepage;
