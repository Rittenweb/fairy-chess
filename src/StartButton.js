import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function StartButton({ gameOver }) {
  const dispatch = useContext(DispatchContext);

  const setup = function setup(e) {
    dispatch({
      type: 'setup',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  let text = gameOver ? 'Play Again?' : 'Start Game';

  return (
    <button className='startbutton' onClick={setup}>
      {text}
    </button>
  );
}
