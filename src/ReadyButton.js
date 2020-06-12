import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function ReadyButton() {
  const dispatch = useContext(DispatchContext);

  const setup = function setup(e) {
    dispatch({
      type: 'startGame',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  return (
    <button className='readybutton' onClick={setup}>
      I'm Ready
    </button>
  );
}
