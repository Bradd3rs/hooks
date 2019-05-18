import React, { useState, useEffect } from 'react';
import huntHelper from './huntHelper';
import Attack from './attackHelper';

function App() {
  const [zombies, setZombies] = useState(1);
  const [defence, setDefence] = useState(0);
  const [scrap, setScrap] = useState(0);
  const [level, setLevel] = useState(1);
  // const [items, setItems] = useState(0);
  
  useEffect(() => {
    console.log('useEffect');
  }, [])

  function hunt() {
    setZombies(zombies + huntHelper(zombies))
  }

  function attack() {
    setLevel(level + Attack(level, zombies, scrap))
  }

  return (
    <div>
      <p>Zombies: {zombies}</p>

      <button type="button" onClick={attack}>Attack lvl {level}</button>
      <button type="button" onClick={hunt}>Hunt</button>
    </div>
  )
}

export default App;
