import React from 'react';
import BenchPiece from './BenchPiece';

const BenchSquare = ({ num, piece, canDrag }) => {
  let squareColor;
  if (num < 8) {
    squareColor = num % 2 === 0 ? '#6F7A6B' : '#A2AF9F';
  } else {
    squareColor = num % 2 === 0 ? '#A2AF9F' : '#6F7A6B';
  }

  return (
    <div className='bench-square' style={{ backgroundColor: squareColor }}>
      {piece && <BenchPiece canDrag={canDrag} piece={piece} />}
    </div>
  );
};

export default BenchSquare;
