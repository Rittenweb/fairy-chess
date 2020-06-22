import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import useSound from 'use-sound';
import startSound from './audio/enchanted_forest.mp3';

export default function StartButton({ gameOver }) {
  const dispatch = useContext(DispatchContext);
  const [play] = useSound(startSound, { loop: true, volume: 0.5 });

  const start = function start(e) {
    play();
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
