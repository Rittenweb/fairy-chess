import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function StartButton({ gameOver }) {
  const dispatch = useContext(DispatchContext);

  const start = function start(e) {
    dispatch({
      type: 'setup',
    });
    //This dispatch initializes squareState. Not cleanest, but currently necessary.
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  let text = gameOver ? 'Play Again?' : 'Start Game';

  return (
    <button className='startbutton' onClick={start}>
      {text}
    </button>
  );
}
