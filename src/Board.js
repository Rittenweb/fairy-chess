import React from 'react';
import DragSquare from './DragSquare';

function renderSquare(squareNum, gameState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);
  const piece = gameState[x] ? gameState[x][y] : null;

  return <DragSquare key={squareNum} x={x} y={y} piece={piece} />;
}

export default function Board({ gameState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  return <div className='board'>{squareList}</div>;
}
