import React, { useContext } from 'react';
import { PieceDispatchContext, SquareDispatchContext } from './Contexts';

export default function EndTurnButton({ enemyCapShown }) {
  const dispatchPiece = useContext(PieceDispatchContext);
  const dispatchSquare = useContext(SquareDispatchContext);

  const endturn = function endturn(e) {
    dispatchPiece({
      type: 'endturn',
    });
    if (enemyCapShown) {
      dispatchSquare({
        type: 'enemyCaptureOn',
      });
    }
  };

  return (
    <button className='endturnbutton' onClick={endturn}>
      End Turn
    </button>
  );
}
