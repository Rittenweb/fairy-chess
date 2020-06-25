import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';

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

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <button
        className='showmovesbutton'
        onClick={togglemovesshown}
        style={{ backgroundPosition }}
        ref={ref}>
        {captureShown && (
          <span>
            Hide Enemy<br></br>Capture Areas
          </span>
        )}
        {!captureShown && (
          <span>
            Show Enemy<br></br>Capture Areas
          </span>
        )}
      </button>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition={'fade'}
      timeIn={2000}
      timeOut={300}
      renderChild={renderFn}
    />
  );
}
