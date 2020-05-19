import React, { useState } from 'react';
import Piece from './Piece';

const Square = React.memo(({ piece, x, y, color }) => {
  console.count('square');

  return (
    <div style={{ backgroundColor: squareColor }} className='square'>
      {piece && <Piece symbol={piece} x={x} y={y} />}
    </div>
  );
});

export default Square;
