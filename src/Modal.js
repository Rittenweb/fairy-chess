import React from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ piece, handleClick }) {
  return createPortal(
    <div className='modal-background' onClick={handleClick}>
      <div className='modal'></div>
    </div>,
    document.getElementById('modal')
  );
}
