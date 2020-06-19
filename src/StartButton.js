import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function StartButton({ gameOver }) {
  const dispatch = useContext(DispatchContext);

  const start = function start(e) {
    dispatch({
      type: 'transitionstart',
    });
    setTimeout(() => {
      dispatch({
        type: 'setup',
      });
      //This dispatch initializes squareState. Not the cleanest, but currently necessary.
      dispatch({
        type: 'showEnemyCapture',
      });
    }, 500);
  };

  let text = gameOver ? 'Play Again?' : 'Start Game';

  return (
    <button className='startbutton' onClick={start}>
      {text}
    </button>
  );
}
