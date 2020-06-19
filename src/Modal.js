import React, { useState } from 'react';
import ModalBoard from './ModalBoard';
import { getRarity } from './pieceData';

export default function Modal({ piece, handleClick }) {
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
      style={{ animation: animation }}
      onClick={animateClick}
      onMouseOver={handleMouseOver}>
      <div className='modal'>
        {piece.name}: lvl.{getRarity(piece.name)}
        <ModalBoard piece={piece}></ModalBoard>
        <div style={{ fontSize: '.75rem' }}>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'blue',
              }}></div>
            Move or Capture (Slide)
          </div>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'purple',
              }}></div>
            Move or Capture (Leap)
          </div>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'yellow',
              }}></div>
            Only Move
          </div>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'orange',
              }}></div>
            Only Capture
          </div>
        </div>
      </div>
    </div>
  );
}
