import React, { useState } from 'react';
import ModalBoard from './ModalBoard';
import { getRarity } from './pieceData';

export default function Modal({ piece, handleClick }) {
  const [animation, setAnimation] = useState('grow 200ms ease-out');

  const animateClick = function animateClick(e) {
    e.preventDefault();
    e.stopPropagation();
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
      onContextMenu={animateClick}
      onMouseOver={handleMouseOver}>
      <div className='modal'>
        <div className='modal-banner'>
          <span className='modal-name'>{piece.name}</span>
          <span className='modal-lvl'>Lvl. {getRarity(piece.name)}</span>
        </div>
        <ModalBoard piece={piece}></ModalBoard>
        <div className='modal-movetypes'>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: 'blue',
              color: 'white',
            }}>
            Move or Capture (Slide)
          </div>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: 'purple',
              color: 'white',
            }}>
            Move or Capture (Leap)
          </div>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: 'yellow',
              color: 'black',
            }}>
            Only Move
          </div>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: 'orange',
              color: 'black',
            }}>
            Only Capture
          </div>
        </div>
      </div>
    </div>
  );
}
