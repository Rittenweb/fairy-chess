import React from 'react';
import BenchSquare from './BenchSquare';

function renderSquare(squareNum, gameState) {
  const piece = gameState.benchPieces[squareNum];
  // const square = gameState.benchSquares[squareNum];
  console.log(piece);
  return (
    <BenchSquare key={squareNum} num={squareNum} piece={piece} canDrag={null} />
  );
}

export default function Bench({ gameState }) {
  const squareList = [];
  for (let i = 0; i < 16; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  return <div className='bench'>{squareList}</div>;
}
