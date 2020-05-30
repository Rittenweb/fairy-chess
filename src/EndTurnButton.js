import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function EndTurnButton({ enemyCapShown }) {
  const dispatch = useContext(DispatchContext);

  const endturn = function endturn(e) {
    dispatch({
      type: 'endturn',
    });
    if (enemyCapShown) {
      dispatch({
        type: 'enemyCaptureOn',
      });
    }
  };

  return (
    <button className='endturnbutton' onClick={endturn}>
      End Turn
    </button>
  );
}
