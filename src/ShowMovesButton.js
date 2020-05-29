import React, { useContext } from 'react';
import { SquareDispatchContext, GameDispatchContext } from './Contexts';

export default function ShowMovesButton({ shown }) {
  const dispatchSquare = useContext(SquareDispatchContext);
  const dispatchGame = useContext(GameDispatchContext);

  const togglemovesshown = function togglemovesshown(e) {
    if (shown) {
      dispatchGame({
        type: 'enemyCaptureOff',
      });
      dispatchSquare({
        type: 'enemyCaptureOff',
      });
    } else {
      dispatchGame({
        type: 'enemyCaptureOn',
      });
      dispatchSquare({
        type: 'enemyCaptureOn',
      });
    }
  };

  return (
    <button className='showmovesbutton' onClick={togglemovesshown}>
      {shown && 'Hide Enemy Capture Areas'}
      {!shown && 'Show Enemy Capture Areas'}
    </button>
  );
}
