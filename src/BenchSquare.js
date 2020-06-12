import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

const BenchSquare = ({ num, piece, canDrag }) => {
  const dispatch = useContext(DispatchContext);

  let squareColor;
  if (num < 8) {
    squareColor = num % 2 === 0 ? '#6F7A6B' : '#A2AF9F';
  } else {
    squareColor = num % 2 === 0 ? '#A2AF9F' : '#6F7A6B';
  }
  if (canDrag) {
    squareColor = 'yellow';
  }

  return (
    <div className='bench-square' style={{ backgroundColor: squareColor }}>
      {num}
    </div>
  );
};

export default BenchSquare;
