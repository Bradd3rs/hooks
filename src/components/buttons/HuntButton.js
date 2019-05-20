import React from 'react';
import styled from 'styled-components';

const HuntButton = ({onClick, text}) => (
  <Container onClick={() => onClick()}>
    {text}
  </Container>
)

export default HuntButton;

const Container = styled.div`
  padding: 20px;
  color: white;
  border-radius: 4px;
  background-color: rebeccapurple;
  text-align: center;
`;