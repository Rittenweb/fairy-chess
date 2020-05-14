import React, { useContext } from 'react';
import { DispatchContext, GameStateContext } from './Contexts';
import { useDrop } from 'react-dnd';
import { DndItemTypes } from './DndItemTypes';
import Piece from './Piece';
import HighlightSquare from './HighlightSquare';

const squareIsValidMove = function squareIsValidMove(x, y) {
  console.log(x, y);
  return false;
};

export default function Square({ x, y }) {
  const dispatch = useContext(DispatchContext);
  const gameState = useContext(GameStateContext);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DndItemTypes.PIECE,
    drop: () => dispatch({ type: 'move', xDest: x, yDest: y, piece: 'B' }),
    canDrop: () => squareIsValidMove(x, y),
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  const squareColor =
    (x + y) % 2 === 0 ? 'rgb(17, 78, 17)' : 'rgb(28, 148, 28)';
  const pieceType = gameState[x] ? gameState[x][y] : null;
  const piece = pieceType ? <Piece symbol={pieceType} /> : null;

  return (
    <div ref={drop} className='square' style={{ backgroundColor: squareColor }}>
      {piece}
      {isOver && !canDrop && <HighlightSquare color='red' />}
      {!isOver && canDrop && <HighlightSquare color='yellow' />}
      {isOver && canDrop && <HighlightSquare color='green' />}
    </div>
  );
}
