import React from 'react';
import BenchPiece from './BenchPiece';

const BenchSquare = ({ num, piece, canDrag }) => {
  let squareColor;
  if (num < 8) {
    squareColor = num % 2 === 0 ? 'var(--color-dark)' : '#9B8B6B';
  } else {
    squareColor = num % 2 === 0 ? '#9B8B6B' : 'var(--color-dark)';
  }

  return (
    <div className='bench-square' style={{ backgroundColor: squareColor }}>
      {piece && <BenchPiece canDrag={canDrag} piece={piece} />}
    </div>
  );
};

export default BenchSquare;
