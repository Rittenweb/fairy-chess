import React from 'react';
import { createPortal } from 'react-dom';
import ModalBoard from './ModalBoard';

export default function Modal({ piece, handleClick }) {
  return createPortal(
    <div className='modal-background' onClick={handleClick}>
      <div className='modal'>
        {piece.name}
        <ModalBoard piece={piece}></ModalBoard>
        <div style={{ fontSize: '.75rem' }}>
          <div className='flex'>
            <div
              className='modal-square'
              style={{
                backgroundColor: 'blue',
              }}></div>
            Move or Capture
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
    </div>,
    document.getElementById('modal')
  );
}
