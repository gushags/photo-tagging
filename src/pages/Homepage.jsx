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
  return (
    <>
      <Navigation grayStates={grayStates} />
      <GameImage grayStates={grayStates} setGrayStates={setGrayStates} />
    </>
  );
}

export default Homepage;
