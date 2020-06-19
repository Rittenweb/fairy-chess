import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionComponent from './TransitionComponent';

export default function EndTurnButton({ show }) {
  const dispatch = useContext(DispatchContext);

  const endTurn = function endTurn(e) {
    dispatch({ type: 'transitioninprogress' });
    setTimeout(() => {
      dispatch({
        type: 'endTurn',
      });
      dispatch({
        type: 'showEnemyCapture',
      });
    }, 300);
  };

  return (
    <TransitionComponent show={show} transition={'fade'} time={300}>
      <button className='endturnbutton' onClick={endTurn}>
        End Turn
      </button>
    </TransitionComponent>
  );
}
