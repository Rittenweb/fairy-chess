import React from 'react';
import { getSquareHighlights } from './pieceData';

let dummyPieceState = {};
for (let i = 0; i < 12; i++) {
  dummyPieceState[i] = {};
  for (let j = 0; j < 12; j++) {
    dummyPieceState[i][j] = null;
  }
}

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

  [
    moveSquares,
    leapSquares,
    moveNoCapSquares,
    capNoMoveSquares,
  ] = getSquareHighlights(
    11,
    11,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  let [
    tempMoveSquares,
    tempLeapSquares,
    tempMoveNoCapSquares,
    tempCapNoMoveSquares,
  ] = getSquareHighlights(
    0,
    11,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  moveSquares = moveSquares.concat(
    tempMoveSquares.map((square) => [square[0] + 11, square[1]]) || []
  );
  leapSquares = leapSquares.concat(
    tempLeapSquares.map((square) => [square[0] + 11, square[1]]) || []
  );
  moveNoCapSquares = moveNoCapSquares.concat(
    tempMoveNoCapSquares.map((square) => [square[0] + 11, square[1]]) || []
  );
  capNoMoveSquares = capNoMoveSquares.concat(
    tempCapNoMoveSquares.map((square) => [square[0] + 11, square[1]]) || []
  );

  [
    tempMoveSquares,
    tempLeapSquares,
    tempMoveNoCapSquares,
    tempCapNoMoveSquares,
  ] = getSquareHighlights(
    11,
    0,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  moveSquares = moveSquares.concat(
    tempMoveSquares.map((square) => [square[0], square[1] + 11]) || []
  );
  leapSquares = leapSquares.concat(
    tempLeapSquares.map((square) => [square[0], square[1] + 11]) || []
  );
  moveNoCapSquares = moveNoCapSquares.concat(
    tempMoveNoCapSquares.map((square) => [square[0], square[1] + 11]) || []
  );
  capNoMoveSquares = capNoMoveSquares.concat(
    tempCapNoMoveSquares.map((square) => [square[0], square[1] + 11]) || []
  );

  [
    tempMoveSquares,
    tempLeapSquares,
    tempMoveNoCapSquares,
    tempCapNoMoveSquares,
  ] = getSquareHighlights(
    0,
    0,
    piece.name,
    dummyPieceState,
    dummyFullPieceState
  );
  moveSquares = moveSquares.concat(
    tempMoveSquares.map((square) => [square[0] + 11, square[1] + 11]) || []
  );
  leapSquares = leapSquares.concat(
    tempLeapSquares.map((square) => [square[0] + 11, square[1] + 11]) || []
  );
  moveNoCapSquares = moveNoCapSquares.concat(
    tempMoveNoCapSquares.map((square) => [square[0] + 11, square[1] + 11]) || []
  );
  capNoMoveSquares = capNoMoveSquares.concat(
    tempCapNoMoveSquares.map((square) => [square[0] + 11, square[1] + 11]) || []
  );

  for (let i = 0; i < 23; i++) {
    squares[i] = {};
    for (let j = 0; j < 23; j++) {
      squares[i][j] =
        (i + j) % 2 === 0 ? 'rgb(17, 78, 17)' : 'rgb(28, 148, 28)';
    }
  }

  capNoMoveSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'orange';
  });
  moveNoCapSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'yellow';
  });
  moveSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'blue';
  });
  leapSquares.forEach((square) => {
    squares[square[0]][square[1]] = 'purple';
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
