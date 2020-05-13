import React from 'react';
import Square from './Square';
import Piece from './Piece';

function renderSquare(squareNum, gameState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);
  const dark = (x + y) % 2 === 0;
  const pieceType = gameState[x] ? gameState[x][y] : null;
  const piece = pieceType ? <Piece symbol={pieceType} /> : null;
  return (
    <Square key={squareNum} dark={dark}>
      {piece}
    </Square>
  );
}

export default function Board({ gameState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  return <div className='board'>{squareList}</div>;
}
