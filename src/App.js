import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import huntHelper from './huntHelper';
import Attack from './attackHelper';
import Button from './components/buttons/Button';

function App() {
  const [zombies, setZombies] = useState(1);
  const [defence, setDefence] = useState(0);
  const [scrap, setScrap] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState(``);
  const [lock, setLock] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [attackingCooldown, setAttackingCooldown] = useState(10);
  const [hunting, setHunting] = useState(false);
  const [huntingCooldown, setHuntingCooldown] = useState(5);
  const [crafting, setCrafting] = useState(false);
  const [craftingCooldown, setCraftingCooldown] = useState(5);
  // const [items, setItems] = useState(0);
  
  useEffect(() => {
    setCraftingCooldown(scrap / 5)
    console.log('useEffect');
  }, [scrap])

  function hunt() {
    setHunting(true);
    setLock(true);
    const zombiesGained = huntHelper(zombies);

    setTimeout(() => {
      setHunting(false);
      setLock(false);
      setZombies(zombies + zombiesGained.zombies);
      setScrap(scrap + 1);
      setMessage(`you gained ${zombiesGained.zombies} zombies`);
    }, huntingCooldown * 1000)

  }

  function attack() {
    setAttacking(true);
    setLock(true);
    const attackResult = Attack(level, zombies, defence);
    setTimeout(() => {
      if(attackResult) {
        setMessage(`You defeated lvl ${level}, gained ${attackResult.population} zombies and ${attackResult.scrap} scrap!`);
        setLevel(level + 1);
        setScrap(scrap + attackResult.scrap);
        setZombies(zombies + attackResult.population);
  
      } else { 
        setMessage(`You were wiped out by lvl ${level} :(`)
        setLevel(level);
        setZombies(1);
        setScrap(0);
        setDefence(0);
      }

      setAttacking(false);
      setLock(false);
    }, attackingCooldown * 1000)
    console.log(attackResult)
  }

  function craft() {
    if(scrap >= 5) {
      setCrafting(true);
      setLock(true);
      setTimeout(() => {
        
        const defenceGain = Math.floor(scrap / 5);
        const remainder = scrap % 5;
        
        setMessage(`You gained ${defenceGain} defense`)
        setDefence(defence + defenceGain);
        setScrap(remainder);
        setCrafting(false);
        setLock(false);
      }, craftingCooldown * 1000);
    } else setMessage(`You don't have enough scrap!`)
  }

  return (
    <Container>
      <p>Zombies: {zombies} <span>D: {defence}</span></p>
      <p>Scrap: {scrap}</p>
      <p>{message}</p>
      <Button color="green" onClick={attack} active={attacking} cooldown={attackingCooldown} text={`Attack lvl ${level}`} locked={lock} />
      <Button color="red" onClick={hunt} active={hunting} cooldown={huntingCooldown} text={'Hunt'} locked={lock} />
      <Button color="purple" onClick={craft} active={crafting} cooldown={craftingCooldown} text={'Craft'} locked={lock} />
    </Container>
  )
}

export default App;


const Container = styled.div``;