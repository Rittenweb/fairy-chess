import React from 'react';
import DragSquare from './DragSquare';

function renderSquare(squareNum, gameState, squareState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);
  const piece = gameState[x] ? gameState[x][y] : null;
  const canDrop = squareState[x] ? squareState[x][y] : null;

  return (
    <DragSquare key={squareNum} x={x} y={y} piece={piece} canDrop={canDrop} />
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
