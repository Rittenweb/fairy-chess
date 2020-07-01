import React from 'react';
import DragSquare from './DragSquare';
import useSound from 'use-sound';
import dropSound from './audio/drop.ogg';

function renderSquare(squareNum, gameState, playSound) {
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
      playSound={playSound}
    />
  );
}

export default function Board({ gameState }) {
  const [play] = useSound(dropSound);

  const squareList = [];
  for (let i = 0; i < 144; i++) {
    squareList.push(renderSquare(i, gameState, play));
  }
  return (
    <div className='board-wrapper'>
      <div style={{ marginTop: '95%' }}></div>
      {/* this hack allows board height to also be determined relative to vw */}
      <div className='board'> {squareList} </div>
    </div>
  );
}
