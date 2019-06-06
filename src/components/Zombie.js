import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Zombie = ({id}) => {
    console.trace('zombie')
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    const Head = styled.div`
        background-color: ${getRandomColor()};
    `;
    return (
        <div className={`zombie`}>
            <Head className="head">
                <div className="left eye"></div>
                <div className="right eye"></div>
            </Head>
            <div className="left hand"></div>
            <div className="right hand"></div>
        </div>
    )
}

export default Zombie;
