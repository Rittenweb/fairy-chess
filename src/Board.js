import React from 'react';
import DragSquare from './DragSquare';

function renderSquare(squareNum, pieceState, squareState, gameState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);
  const piece = pieceState[x][y];
  const square = squareState[x][y];

  return (
    <DragSquare
      key={squareNum}
      x={x}
      y={y}
      piece={piece}
      canDrop={square.canDrop}
      xMark={square.xMark}
      shown={gameState.enemyCaptureShown}
    />
  );
}

export default function Board({ pieceState, squareState, gameState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, pieceState, squareState, gameState));
  }
  console.count('board');
  return <div className='board'>{squareList}</div>;
}
