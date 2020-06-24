import React from 'react';
import DragSquare from './DragSquare';

function renderSquare(squareNum, gameState) {
  const x = squareNum % 12;
  const y = Math.floor(squareNum / 12);
  const piece = gameState.pieces[x][y];
  const square = gameState.squares[x][y];

  return (
    <DragSquare
      key={squareNum}
      x={x}
      y={y}
      piece={piece}
      canDrop={square.canDrop}
      captureMark={square.captureMark}
    />
  );
}

export default function Board({ gameState }) {
  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  console.count('board');
  return (
    <div className='board-wrapper'>
      <div style={{ marginTop: '95%' }}></div>
      {/* this hack allows board height to also be determined relative to vw */}
      <div className='board'> {squareList} </div>
    </div>
  );
}
