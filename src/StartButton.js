import React, { useContext } from 'react';
import { PieceDispatchContext, GameDispatchContext } from './Contexts';
import { getPieceWithRarity } from './pieceData';

export default function StartButton() {
  const dispatchPiece = useContext(PieceDispatchContext);
  const dispatchGame = useContext(GameDispatchContext);

  const setup = function setup(e) {
    let piece1 = getPieceWithRarity(1);
    let piece2 = getPieceWithRarity(1);
    let piece3 = getPieceWithRarity(1);
    let piece4 = getPieceWithRarity(2);
    let piece5 = getPieceWithRarity(2);
    let piece6 = getPieceWithRarity(3);
    dispatchPiece({
      type: 'setup',
      piece1,
      piece2,
      piece3,
      piece4,
      piece5,
      piece6,
    });
    dispatchGame({
      type: 'gamestart',
    });
  };

  return (
    <button className='startbutton' onClick={setup}>
      Start Game
    </button>
  );
}
