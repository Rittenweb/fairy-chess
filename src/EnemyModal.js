import React from 'react';
import EnemyModalBoard from './EnemyModalBoard';

export default function EnemyModal({ piece, handleClick }) {
  const handleMouseOver = function handleMouseOver(e) {
    e.stopPropagation();
  };

  return (
    <div
      className='modal-background'
      onClick={handleClick}
      onMouseOver={handleMouseOver}>
      <div className='modal'>
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
