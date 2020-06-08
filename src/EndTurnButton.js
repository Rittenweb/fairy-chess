import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function EndTurnButton() {
  const dispatch = useContext(DispatchContext);

  const endturn = function endturn(e) {
    dispatch({
      type: 'endturn',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  return (
    <button className='endturnbutton' onClick={endturn}>
      End Turn
    </button>
  );
}
