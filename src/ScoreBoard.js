import React from 'react';

export default function ScoreBoard({ score }) {
  return (
    <div className='scoreboard'>
      <span style={{ textDecoration: 'underline' }}>Score</span>
      <span style={{ fontSize: '150%' }}>{score}</span>
    </div>
  );
}
