import React from 'react';
import styled from 'styled-components';

const CraftButton = ({onClick, text}) => (
  <Container onClick={() => onClick()}>
    {text}
  </Container>
)

export default CraftButton;

const Container = styled.div`
  padding: 20px;
  color: white;
  border-radius: 4px;
  background-color: paleturquoise;
  text-align: center;
`;