import React from 'react';
import SmartSquare from './SmartSquare';

function renderSquare(squareNum, gameState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);

  return <SmartSquare key={squareNum} x={x} y={y} />;
}

export default function Board({ gameState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  return <div className='board'>{squareList}</div>;
}
