import React from 'react';

export default function ScoreBoard({ score }) {
  return (
    <div className='scoreboard'>
      <div>Score</div>
      <div>{score}</div>
    </div>
  );
}
