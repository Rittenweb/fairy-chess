import React, { useContext } from 'react';
import { PieceDispatchContext } from './Contexts';

export default function EndTurnButton() {
  const dispatchPiece = useContext(PieceDispatchContext);

  const endturn = function endturn(e) {
    dispatchPiece({
      type: 'endturn',
    });
  };

  return (
    <button className='endturnbutton' onClick={endturn}>
      End Turn
    </button>
  );
}
