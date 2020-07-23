import React from 'react';
import { getAllEnemyCapSquaresRelative, getEnemyMoveSquareRelative } from '../util/pieceData';

export default function EnemyModalBoard({ piece }) {
  let squares = {};

  let moveSquare = getEnemyMoveSquareRelative(piece.name);
  moveSquare[0] = moveSquare[0] + 11;
  moveSquare[1] = moveSquare[1] + 11;

  let capSquares = getAllEnemyCapSquaresRelative(piece.name);
  capSquares.forEach((square) => {
    square[0] = square[0] + 11;
    square[1] = square[1] + 11;
  });

  for (let i = 0; i < 23; i++) {
    squares[i] = {};
    for (let j = 0; j < 23; j++) {
      squares[i][j] = (i + j) % 2 === 0 ? 'var(--color-green)' : 'var(--color-dark)';
    }
  }

  squares[moveSquare[0]][moveSquare[1]] = 'var(--color-light)';
  capSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'var(--color-red)';
  });
  squares[11][11] = 'black';

  let squareList = [];
  for (let i = 0; i < 23; i++) {
    for (let j = 0; j < 23; j++) {
      squareList.push(
        <div
          key={i * 23 + j}
          style={{
            height: '4.34%',
            width: '4.34%',
            backgroundColor: `${squares[i][j]}`,
          }}></div>
      );
    }
  }

  return <div className='modal-board'>{squareList}</div>;
}
