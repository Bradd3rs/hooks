import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import huntHelper from './huntHelper';
import Attack from './attackHelper';
import AttackButton from './components/buttons/AttackButton';
import HuntButton from './components/buttons/HuntButton';
import CraftButton from './components/buttons/CraftButton';


function App() {
  const [zombies, setZombies] = useState(1);
  const [defence, setDefence] = useState(0);
  const [scrap, setScrap] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState(``);
  // const [items, setItems] = useState(0);
  
  useEffect(() => {
    console.log('useEffect');
  }, [])

  function hunt() {
    const zombiesGained = huntHelper(zombies);

    setZombies(zombies + zombiesGained.zombies);
    setScrap(scrap + 1);
    setMessage(`you gained ${zombiesGained.zombies} zombies`);
  }

  function attack() {
    if(Attack(level, zombies, defence)) {
      setMessage(`You defeated lvl ${level} and found ${zombies} scrap!`);
      setLevel(level + 1);
      setScrap(scrap + zombies);

    } else { 
      setMessage(`You were wiped out by lvl ${level} :(`)
      setLevel(level);
      setZombies(1);
      setScrap(0);
      setDefence(0);
    }
  }

  function craft() {
    if(scrap >= 5) {
      const defenceGain = Math.floor(scrap / 5);
      const remainder = scrap % 5;

      setMessage(`You gained ${defenceGain} defense`)
      setDefence(defence + defenceGain);
      setScrap(remainder);
    } else setMessage(`You don't have enough scrap!`)
  }

  return (
    <Container>
      <p>Zombies: {zombies} <span>D: {defence}</span></p>
      <p>Scrap: {scrap}</p>
      <p>{message}</p>

      <AttackButton onClick={attack} text={`Attack lvl ${level}`} color="red" />
      <HuntButton onClick={hunt} text="Hunt!" />
      <CraftButton onClick={craft} text="Craft" />
    </Container>
  )
}

export default App;


const Container = styled.div``;