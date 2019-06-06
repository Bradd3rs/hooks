import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Storage from './storage';

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
  const [mounted, setMounted] = useState(false);
  // const [items, setItems] = useState(0);
  
  useEffect(() => {
    setCraftingCooldown(scrap / 5);
    setMounted(true);

    if(!mounted && Storage.get('data')) {
      const data = Storage.get('data');

      setZombies(data.zombies)
      setDefence(data.defence)
      setScrap(data.scrap)
      setLevel(data.level)
      
    } else {
      const data = {
        zombies,
        defence,
        scrap,
        level
      }
      Storage.set('data', data)
    }
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
      <StatsContainer>
        <p>Zombies: {zombies}</p>
        <p>Defence: {defence}</p>
        <p>Scrap: {scrap}</p>
        <MessageContainer>
          <p>{message}</p>
        </MessageContainer>
      </StatsContainer>
      <Options>
        <OptionList>
          <Button color="red" onClick={hunt} active={hunting} cooldown={huntingCooldown} text={'Hunt'} locked={lock} />
          <Button color="purple" onClick={craft} active={crafting} cooldown={craftingCooldown} text={'Craft'} locked={lock} />
        </OptionList>
        <Spacer />
      </Options>
      <ButtonContainer>
        <Button color="green" onClick={attack} active={attacking} cooldown={attackingCooldown} text={`Attack level ${level}`} locked={lock} />
      </ButtonContainer>
    </Container>
  )
}

export default App;

const Spacer = styled.div`
  height: 80px;
  width: 100%;
`;

const OptionList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Container = styled.div`
  padding: 10px;
  font-size: 30px;
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  color: #4ecca3;
  max-width: 800px;
  margin: auto;
`;

const StatsContainer = styled.div`
  position: relative;
  background-color: #47505f;
  border: 1px solid #4ecca3;
  padding: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  margin: 10px;
  bottom: 0;
  right: 0;
  left: 0;
`;

const ButtonContainer = styled.div`
  text-align: center;
  position: absolute;
  margin: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  background-color: #47505f;
`;

const MessageContainer = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
`;
