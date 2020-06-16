import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function ReadyButton({ ready }) {
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
    <>
      {ready && (
        <button className='readybutton' onClick={setup}>
          I'm Ready
        </button>
      )}
      {!ready && <div className='readybutton'>0/3 Common</div>}
    </>
  );
}
