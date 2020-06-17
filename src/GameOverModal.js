import React from 'react';
import StartButton from './StartButton';

export default function GameOverModal({ score }) {
  return (
    <div className='modal-background'>
      <div className='modal'>
        <div>Game Over... </div>
        <StartButton gameOver={true} />
        <div>Your score: {score}</div>
      </div>
    </div>
  );
}
