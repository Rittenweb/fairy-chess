import React, { useState } from 'react';
import EnemyModalBoard from './EnemyModalBoard';

export default function EnemyModal({ piece, handleClick }) {
  const [animation, setAnimation] = useState('grow 200ms ease-out');

  const animateClick = function animateClick(e) {
    setAnimation('shrink 200ms ease-out');
    setTimeout(() => {
      //handleclick toggles modalDisplay boolean in parent component, de-rendering
      handleClick(e);
    }, 200);
  };

  const handleMouseOver = function handleMouseOver(e) {
    e.stopPropagation();
  };

  return (
    <div
      className='modal-background'
      onClick={animateClick}
      onMouseOver={handleMouseOver}
      style={{ animation: animation }}>
      <div className='modal enemy-modal'>
        {piece.name}
        <EnemyModalBoard piece={piece}></EnemyModalBoard>
        <div style={{ fontSize: '1rem' }}>
          <div className='flex'>
            <div className='modal-square color-light'></div>
            Move Square
          </div>
          <div className='flex'>
            <div className='modal-square color-red'></div>
            Capture Squares
          </div>
        </div>
      </div>
    </div>
  );
}
