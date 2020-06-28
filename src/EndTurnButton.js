import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';

export default function EndTurnButton({ show, shouldTurnEnd }) {
  const dispatch = useContext(DispatchContext);
  const [myTimeOut, setMyTimeout] = useState(false);

  const endTurn = function endTurn(e) {
    dispatch({ type: 'transitioninprogress' });
    if (!myTimeOut) {
      setMyTimeout(true);
      setTimeout(() => {
        dispatch({ type: 'endTurn' });
        dispatch({ type: 'showEnemyCapture' });
        setMyTimeout(false);
      }, 300);
    }
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <button
        className={shouldTurnEnd ? 'endturnbutton pulse' : 'endturnbutton'}
        onClick={endTurn}
        style={{ backgroundPosition }}
        ref={ref}>
        End Turn
      </button>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition='fade'
      timeIn={2000}
      timeOut={300}
      renderChild={renderFn}
    />
  );
}
