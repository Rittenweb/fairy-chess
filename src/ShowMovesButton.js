import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionComponent from './TransitionComponent';

export default function ShowMovesButton({ captureShown, show }) {
  const dispatch = useContext(DispatchContext);

  const togglemovesshown = function togglemovesshown(e) {
    if (captureShown) {
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
    <TransitionComponent show={show} transition={'fade'} time={300}>
      <button className='showmovesbutton' onClick={togglemovesshown}>
        {captureShown && 'Hide Enemy Capture Areas'}
        {!captureShown && 'Show Enemy Capture Areas'}
      </button>
    </TransitionComponent>
  );
}
