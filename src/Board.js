import React from 'react';
import Square from './Square';

function renderSquare(squareNum, gameState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);

  return <Square key={squareNum} x={x} y={y} />;
}

export default function Board({ gameState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  return <div className='board'>{squareList}</div>;
}
