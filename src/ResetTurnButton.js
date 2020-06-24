import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';

export default function ResetTurnButton({ show }) {
  const dispatch = useContext(DispatchContext);

  const resetturn = function resetturn(e) {
    dispatch({
      type: 'resetTurn',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <button
        className='resetturnbutton'
        onClick={resetturn}
        style={{ backgroundPosition }}
        ref={ref}>
        Reset Turn
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
