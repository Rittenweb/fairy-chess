import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function ResetTurnButton({ enemyCapShown }) {
  const dispatch = useContext(DispatchContext);

  const resetturn = function resetturn(e) {
    dispatch({
      type: 'resetTurn',
    });
  };

  return (
    <button className='resetturnbutton' onClick={resetturn}>
      Reset Turn
    </button>
  );
}
