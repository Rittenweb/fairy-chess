import React, { useState } from 'react';
import EnemyModalBoard from './EnemyModalBoard';

export default function EnemyModal({ piece, handleClick }) {
  const [animation, setAnimation] = useState('grow 200ms ease-out');

  const animateClick = function animateClick(e) {
    setAnimation('shrink 200ms ease-out');
    setTimeout(() => {
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
        <div style={{ fontSize: '.75rem' }}>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'blue',
              }}></div>
            Move Square
          </div>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'orange',
              }}></div>
            Capture Squares
          </div>
        </div>
      </div>
    </div>
  );
}
