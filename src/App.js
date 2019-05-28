import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import huntHelper from './huntHelper';
import Attack from './attackHelper';
import Button from './components/buttons/Button';
import Zombie from './components/Zombie';

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

  function setPosition() {
    return Math.floor(Math.random() * 100) + 1;
  }

  return (
    <Container>
      <p>Zombies: {zombies}</p>
      <p>Defence: {defence}</p>
      <p>Scrap: {scrap}</p>
      <ZombieContainer>
        <Zombie position={setPosition} />
        <Zombie position={setPosition} />
      </ZombieContainer>
      <MessageContainer>
        <p>{message}</p>
      </MessageContainer>
      <ButtonContainer>
        <Button color="green" onClick={attack} active={attacking} cooldown={attackingCooldown} text={`Attack`} locked={lock} />
        <Button color="red" onClick={hunt} active={hunting} cooldown={huntingCooldown} text={'Hunt'} locked={lock} />
        <Button color="purple" onClick={craft} active={crafting} cooldown={craftingCooldown} text={'Craft'} locked={lock} />
      </ButtonContainer>
    </Container>
  )
}

export default App;


const Container = styled.div`
  padding: 10px;
  font-size: 30px;
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  background-color: #232931;
  color: #4ecca3;
  max-width: 800px;
  margin: auto;
`;

const ZombieContainer = styled.div`
  position: relative;
  height: 50vh;
`;

const ButtonContainer = styled.div`
  background-color: #393e46;
  text-align: center;
  position: absolute;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  box-shadow: -1px 9px 19px 4px rgba(0,0,0,0.75);
`;

const MessageContainer = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  text-align: center;
`;
