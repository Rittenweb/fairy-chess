import React, { useState } from 'react';
import ModalBoard from './ModalBoard';
import { getRarity } from '../util/pieceData';

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
              backgroundColor: 'var(--color-light)',
              color: 'black',
            }}>
            Move or Capture (Slide)
          </div>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: '#DCB8CB',
              color: 'black',
            }}>
            Move or Capture (Leap)
          </div>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: '#63474D',
              color: 'var(--color-light)',
            }}>
            Only Move
          </div>
          <div
            className='modal-movetype'
            style={{
              backgroundColor: 'var(--color-red)',
              color: 'var(--color-light)',
            }}>
            Only Capture
          </div>
        </div>
      </div>
    </div>
  );
}
