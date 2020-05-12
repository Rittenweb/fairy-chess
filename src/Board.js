import React from 'react';
import Square from './Square';

export default function Board() {
  let squareCoordsList = [];
  for (let y = 12; y >= 0; y--) {
    for (let x = 0; x <= 12; x++) {
      squareCoordsList.push([x, y]);
    }
  }
  return (
    <div className='board'>
      {squareCoordsList.map((square) => (
        <Square key={square[0] + ' ' + square[1]} coords={square} />
      ))}
    </div>
  );
}
