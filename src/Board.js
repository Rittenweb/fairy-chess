import React from 'react';
import DragSquare from './DragSquare';

function renderSquare(squareNum, gameState, squareState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);
  const piece = gameState[x][y];
  const square = squareState[x][y];

  return (
    <DragSquare
      key={squareNum}
      x={x}
      y={y}
      piece={piece}
      canDrop={square.canDrop}
      xMark={square.xMark}
    />
  );
}

export default function Board({ pieceState, squareState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, pieceState, squareState));
  }
  console.count('board');
  return <div className='board'>{squareList}</div>;
}
