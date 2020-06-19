import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionComponent from './TransitionComponent';

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

  return (
    <TransitionComponent show={show} transition={'fade'} time={300}>
      <button className='resetturnbutton' onClick={resetturn}>
        Reset Turn
      </button>
    </TransitionComponent>
  );
}
