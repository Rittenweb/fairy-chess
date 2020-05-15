import React from 'react';
import Piece from './Piece';

const Square = React.memo(({ piece, x, y }) => {
  console.count('square');
  const squareColor =
    (x + y) % 2 === 0 ? 'rgb(17, 78, 17)' : 'rgb(28, 148, 28)';
  return (
    <div style={{ backgroundColor: squareColor }} className='square'>
      {piece && <Piece symbol={piece} x={x} y={y} />}
    </div>
  );
});

export default Square;
