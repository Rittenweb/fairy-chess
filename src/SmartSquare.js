import React, { useContext } from 'react';
import { DispatchContext, GameStateContext } from './Contexts';
import { useDrop } from 'react-dnd';
import { DndItemTypes } from './DndItemTypes';
import Piece from './Piece';
import Square from './Square';
import HighlightSquare from './HighlightSquare';

const canMoveFromTo = function canMoveFromTo(fromX, fromY, toX, toY, piece) {
  switch (piece) {
    case '☙':
      if (toX === fromX) {
        return true;
      } else if (toY === fromY) {
        return true;
      }
      return false;
    default:
      return true;
  }
};

export default function SmartSquare({ x, y }) {
  const dispatch = useContext(DispatchContext);
  const gameState = useContext(GameStateContext);

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: DndItemTypes.PIECE,
    drop: () => {
      dispatch({
        type: 'move',
        xDest: x,
        yDest: y,
        xOrg: item.x,
        yOrg: item.y,
        piece: item.symbol,
      });
    },
    canDrop: () => item && canMoveFromTo(item.x, item.y, x, y, item.symbol),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  const squareColor =
    (x + y) % 2 === 0 ? 'rgb(17, 78, 17)' : 'rgb(28, 148, 28)';
  const pieceType = gameState[x] ? gameState[x][y] : null;
  const piece = pieceType ? <Piece symbol={pieceType} x={x} y={y} /> : null;

  // console.count('smartsquare');
  console.log(isOver);
  console.log(canDrop);
  return (
    <div ref={drop} className='square-container'>
      <Square color={squareColor} piece={piece}></Square>
      {isOver && !canDrop && <HighlightSquare color='red' />}
      {!isOver && canDrop && <HighlightSquare color='yellow' />}
      {isOver && canDrop && <HighlightSquare color='green' />}
    </div>
  );
}
