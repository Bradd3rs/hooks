import React from 'react';
import styled from 'styled-components';

const Button = ({color, onClick, text, active, cooldown, locked}) => {
  return (
    <Container active={active} color={color} className={locked ? 'locked' : ''} onClick={() => onClick()}>
      <ProgressBar color={color} className={active ? 'active' : ''} cooldown={cooldown} />
      {text}
    </Container>
  )
}


export default Button;

const Container = styled.div`
  position: relative;
  padding: 10px;
  color: #4ecca3;
  border-radius: 2px;
  /* background-color: ${props => props.color || 'rebeccapurple'}; */
  text-align: center;
  opacity: 1;
  transition: opacity .2s;
  font-size: 40px;
  font-weight: 700;
  width: 100%;

  &.locked {
    pointer-events: none;
    opacity: ${props => props.active ? 1 : .5};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  background-color: #4ecca3;

  &.active {
    animation-name: cooldown;
    animation-duration: ${props => props.cooldown}s;
    animation-timing-function: ease-out;

    @keyframes cooldown {
      from {width: 0;}
      to {width: 100%;}
    }
  }


`;

