import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import { getPieceWithRarity } from './pieceData';

export default function StartButton({ gameOver }) {
  const dispatch = useContext(DispatchContext);

  const setup = function setup(e) {
    let piece1 = getPieceWithRarity(1);
    let piece2 = getPieceWithRarity(1);
    let piece3 = getPieceWithRarity(1);
    let piece4 = getPieceWithRarity(2);
    let piece5 = getPieceWithRarity(2);
    let piece6 = getPieceWithRarity(3);
    dispatch({
      type: 'setup',
      piece1,
      piece2,
      piece3,
      piece4,
      piece5,
      piece6,
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
