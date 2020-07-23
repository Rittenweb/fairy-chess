import React from 'react';
import { getSquareHighlights } from '../util/pieceData';

let dummyPieceState = {};
for (let i = 0; i < 12; i++) {
  dummyPieceState[i] = {};
  for (let j = 0; j < 12; j++) {
    dummyPieceState[i][j] = null;
  }
}

//Necessary to display all potential capture moves
let dummyFullPieceState = {};
for (let i = 0; i < 12; i++) {
  dummyFullPieceState[i] = {};
  for (let j = 0; j < 12; j++) {
    dummyFullPieceState[i][j] = {
      name: 'shroom',
      enemy: true,
    };
  }
}

export default function ModalBoard({ piece }) {
  let squares = {};
  let moveSquares = [];
  let leapSquares = [];
  let moveNoCapSquares = [];
  let capNoMoveSquares = [];

  //Piece position: bottom-right of regular board. Translates to top-left quadrant of large board
  [moveSquares, leapSquares, moveNoCapSquares, capNoMoveSquares] = getSquareHighlights(
    11,
    11,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  //temp arrays will hold the square results for subsequent piece positions, and then each merge into the non-temp array
  //Piece position: bottom-left of regular board. Translates to top-right quadrant of large board
  let [tempMoveSquares, tempLeapSquares, tempMoveNoCapSquares, tempCapNoMoveSquares] = getSquareHighlights(
    0,
    11,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  moveSquares = moveSquares.concat(tempMoveSquares.map((square) => [square[0] + 11, square[1]]) || []);
  leapSquares = leapSquares.concat(tempLeapSquares.map((square) => [square[0] + 11, square[1]]) || []);
  moveNoCapSquares = moveNoCapSquares.concat(tempMoveNoCapSquares.map((square) => [square[0] + 11, square[1]]) || []);
  capNoMoveSquares = capNoMoveSquares.concat(tempCapNoMoveSquares.map((square) => [square[0] + 11, square[1]]) || []);

  //Piece position: top-right of regular board. Translates to bottom-left quadrant of large board
  [tempMoveSquares, tempLeapSquares, tempMoveNoCapSquares, tempCapNoMoveSquares] = getSquareHighlights(
    11,
    0,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  moveSquares = moveSquares.concat(tempMoveSquares.map((square) => [square[0], square[1] + 11]) || []);
  leapSquares = leapSquares.concat(tempLeapSquares.map((square) => [square[0], square[1] + 11]) || []);
  moveNoCapSquares = moveNoCapSquares.concat(tempMoveNoCapSquares.map((square) => [square[0], square[1] + 11]) || []);
  capNoMoveSquares = capNoMoveSquares.concat(tempCapNoMoveSquares.map((square) => [square[0], square[1] + 11]) || []);

  //Piece position: top-left of regular board. Translates to bottom-right quadrant of large board
  [tempMoveSquares, tempLeapSquares, tempMoveNoCapSquares, tempCapNoMoveSquares] = getSquareHighlights(
    0,
    0,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  moveSquares = moveSquares.concat(tempMoveSquares.map((square) => [square[0] + 11, square[1] + 11]) || []);
  leapSquares = leapSquares.concat(tempLeapSquares.map((square) => [square[0] + 11, square[1] + 11]) || []);
  moveNoCapSquares = moveNoCapSquares.concat(
    tempMoveNoCapSquares.map((square) => [square[0] + 11, square[1] + 11]) || []
  );
  capNoMoveSquares = capNoMoveSquares.concat(
    tempCapNoMoveSquares.map((square) => [square[0] + 11, square[1] + 11]) || []
  );

  for (let i = 0; i < 23; i++) {
    squares[i] = {};
    for (let j = 0; j < 23; j++) {
      squares[i][j] = (i + j) % 2 === 0 ? 'var(--color-green)' : 'var(--color-dark)';
    }
  }

  capNoMoveSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'var(--color-red)';
  });
  moveNoCapSquares.forEach((square) => {
    squares[square[0]][square[1]] = '#63474D';
  });
  moveSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'var(--color-light)';
  });
  leapSquares.forEach((square) => {
    squares[square[0]][square[1]] = '#DCB8CB';
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

  return <div className='modal-board'> {squareList} </div>;
}
