import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function ShowMovesButton({ shown }) {
  const dispatch = useContext(DispatchContext);

  const togglemovesshown = function togglemovesshown(e) {
    if (shown) {
      dispatch({
        type: 'enemyCaptureOff',
      });
    } else {
      dispatch({
        type: 'enemyCaptureOn',
      });
    }
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  return (
    <button className='showmovesbutton' onClick={togglemovesshown}>
      {shown && 'Hide Enemy Capture Areas'}
      {!shown && 'Show Enemy Capture Areas'}
    </button>
  );
}
