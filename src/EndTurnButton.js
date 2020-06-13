import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function EndTurnButton() {
  const dispatch = useContext(DispatchContext);

  const endTurn = function endTurn(e) {
    dispatch({
      type: 'endTurn',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  return (
    <button className='endturnbutton' onClick={endTurn}>
      End Turn
    </button>
  );
}
