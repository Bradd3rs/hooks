import React from 'react';
import styled from 'styled-components';

const AttackButton = ({onClick, cooldown, text, color}) => (
  <Container onClick={() => onClick()}>
    {text}
  </Container>
)
export default AttackButton;

const Container = styled.div`
  padding: 20px;
  color: white;
  border-radius: 4px;
  background-color: green;
  text-align: center;
`;