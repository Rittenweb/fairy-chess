import React from 'react';
import PlayAgainButton from '../PlayAgainButton';
import useSound from 'use-sound';
import gameOverSound from '../audio/999 Ozzie Laugh.mp3';
import { useEffect } from 'react';

export default function GameOverModal({ score }) {
  const [play] = useSound(gameOverSound, { volume: 2 });

  useEffect(() => {
    play();
  }, [play]);

  return (
    <div className='modal-background'>
      <div className='modal gameover-modal'>
        <div>Game Over... </div>
        <PlayAgainButton show={true} />
        <div>Your score: {score}</div>
      </div>
    </div>
  );
}
