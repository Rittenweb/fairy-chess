import React from 'react';

export default function HighlightSquare({ color }) {
  // console.log('higlightsquare');
  return (
    <div
      className='highlight-square'
      style={{
        backgroundColor: color,
      }}
    />
  );
}
