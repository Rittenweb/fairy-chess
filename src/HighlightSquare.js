import React from 'react';

export default function HighlightSquare({ color }) {
  return (
    <div
      className='highlight-square'
      style={{
        backgroundColor: color,
      }}
    />
  );
}
