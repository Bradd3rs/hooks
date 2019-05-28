import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Zombie = ({position}) => {
    const [alive, setAlive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAlive(true);
        }, 500)
    });

    return (
        <Body className={alive ? 'alive' : ''} position={position}>
            <Head>
                <Eye className="left"></Eye>
                <Eye className="right"></Eye>
            </Head>
            <Hand></Hand>
            <Hand className="right"></Hand>
        </Body>
    )
}



export default Zombie;

const Body = styled.div`
    opacity: 0;
    position: absolute;
    height: 50px;
    background: black;
    width: 25px;
    top: ${props => props.position}%;
    left: ${props => props.position}%;
    transition: opacity .5s;

    &.alive {
        opacity: 1;
    }
`;

const Head = styled.div`
    width: 100%;
    height: 30%;
    background-color: #4ecca3;
`;

const Eye = styled.div`
    position: absolute;
    height: 2px;
    width: 2px;
    background-color: red;
    top: 14%;

    &.left {
        left: 7px;
    }

    &.right {
        right: 7px;
    }
`;

const Hand = styled.div`
    position: absolute; 
    width: 5px;
    height: 5px;
    background-color: #4ecca3;
    top: 60%;

    &.right {
        right: 0;
    }
`;