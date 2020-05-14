import React from 'react';

export default function Square({ color, piece }) {
  // console.count('square');
  return (
    <div style={{ backgroundColor: color }} className='square'>
      {piece}
    </div>
  );
}
