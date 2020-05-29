import React, { useContext } from 'react';
import { SquareDispatchContext } from './Contexts';

export default function EndTurnButton() {
  const dispatchSquare = useContext(SquareDispatchContext);

  const showmoves = function showmoves(e) {
    dispatchSquare({
      type: 'showenemycapture',
    });
  };

  return (
    <button className='showmovesbutton' onClick={showmoves}>
      Show Enemy Capture Areas
    </button>
  );
}
