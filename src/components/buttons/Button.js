import React from 'react';
import styled from 'styled-components';

const Button = ({color, onClick, text, active, cooldown, locked}) => {
  return (
    <Container  active={active} color={color} className={locked ? 'locked' : ''} onClick={() => onClick()}>
      <ProgressBar className={active ? 'active' : ''} cooldown={cooldown} />
      {text}
    </Container>
  )
}


export default Button;

const Container = styled.div`
  position: relative;
  padding: 20px;
  margin: 5px;
  color: white;
  border-radius: 4px;
  background-color: ${props => props.color || 'rebeccapurple'};
  border 3px solid ${props => props.color || 'rebeccapurple'};
  text-align: center;
  opacity: 1;
  transition: opacity .2s;
  font-size: 20px;
  font-weight: 700;

  &.locked {
    pointer-events: none;
    opacity: ${props => props.active ? 1 : .8};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  background-color: blue;

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

