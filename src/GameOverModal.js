import React from 'react';
import StartButton from './StartButton';

export default function GameOverModal({ score }) {
  return (
    <div className='modal-background'>
      <div className='modal gameover-modal'>
        <div>Game Over... </div>
        <StartButton gameOver={true} show={true} />
        <div>Your score: {score}</div>
      </div>
    </div>
  );
}
