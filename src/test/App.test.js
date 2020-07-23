import React from 'react';
import {
  render
} from '@testing-library/react';
import App from '../App';
import {
  getRarity,
  getPieceWithRarity,
  getEnemyMoveSquare,
  getEnemyMoveSquareRelative,
  getAllEnemyCapSquaresRelative,
  getEnemyCapSquare,
  getAllEnemyCapSquares,
  randomizeEnemies,
  getMoveableSquares,
  getSquareHighlights,
  enemyPieceDefs,
  pieceDefs,
} from '../util/pieceData';
import {
  testState
} from './testStates';
import {
  initialState
} from '../util/baseStates';

// it('renders without crashing', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Fairy Chess/i);
//   expect(linkElement).toBeInTheDocument();
// });

//PIECEDATA METHODS AND OBJECTS

it('all pieces have a valid rarity', () => {
  for (let piece of Object.keys(pieceDefs)) {
    let rarity = getRarity(piece);
    expect(rarity === 1 || rarity === 2 || rarity === 3).toBeTruthy();
  }
});

it('returns a proper new setup piece', () => {
  let result = getPieceWithRarity(1, 1);
  const schema = {
    name: expect.any(String),
    enemy: false,
    id: expect.any(Number),
  };
  expect(result).toEqual(schema);
});

it('lets enemies move only as far as they can', () => {
  //A three-square moving enemy
  //Which is blocked in all three squares should not return a square
  expect(getEnemyMoveSquare(0, 3, testState.pieces)).toBeUndefined();
  //Which is blocked for the furthest two squares should return one square down
  expect(getEnemyMoveSquare(1, 3, testState.pieces)).toEqual([1, 4]);
  //Which is blocked for the furthest one square should return two down
  expect(getEnemyMoveSquare(2, 3, testState.pieces)).toEqual([2, 5]);
  //Which is not blocked should return three down
  expect(getEnemyMoveSquare(3, 3, testState.pieces)).toEqual([3, 6]);
});

it('all enemy pieces should a valid move value', () => {
  for (let piece of Object.keys(enemyPieceDefs)) {
    let move = getEnemyMoveSquareRelative(piece)[1];
    expect(move === 1 || move === 2 || move === 3).toBeTruthy();
  }
});

it('an enemy that can capture two pieces should take the rarer', () => {
  expect(getEnemyCapSquare(0, 3, testState.pieces)).toEqual([0, 2]);
});

it('getEnemyCapSquare should return undefined if the enemy cant capture', () => {
  expect(getEnemyCapSquare(2, 3, testState.pieces)).toBeUndefined();
});

it('getAllEnemyCapSquares should return squares regardless of piece state', () => {
  let squares = getAllEnemyCapSquares(2, 3, testState.pieces);
  expect(squares).toEqual(
    expect.arrayContaining([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 2],
      [2, 4],
      [3, 2],
      [3, 3],
      [3, 4],
    ])
  );
  expect(squares.length).toBe(8);
});

// it('should put an enemy in each row for setup', () => {
//   const newPieces = randomizeEnemies(initialState.pieces, 1);
//   const schema = {
//     name: expect.any(String),
//     enemy: true,
//     exhausted: false,
//   };
//   for (let column of Object.values(newPieces)) {
//     expect(column).toEqual(
//       expect.objectContaining({
//         [expect.any(String)]: schema,
//       })
//     );
//   }
// });

it('should return proper moveable squares with normal sliding piece', () => {
  let squares = getMoveableSquares(5, 3, 'queen', testState.pieces);
  expect(squares).toEqual(
    expect.arrayContaining([
      //W
      [4, 3],
      [3, 3],
      //NW
      [4, 2],
      [3, 1],
      [2, 0],
      //SW
      [4, 4],
      [3, 5],
      //N
      [5, 2],
      [5, 1],
      [5, 0],
      //S
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      //NE
      [6, 2],
      [7, 1],
      [8, 0],
      //E
      [6, 3],
      [7, 3],
      [8, 3],
      [9, 3],
      [10, 3],
      [11, 3],
      //SE
      [6, 4],
      [7, 5],
      [8, 6],
      [9, 7],
      [10, 8],
      [11, 9],
    ])
  );
  expect(squares.length).toBe(31);
});

it('it should return proper moveable squares with a normal-leaping piece', () => {
  let squares = getMoveableSquares(4, 5, 'knight', testState.pieces);
  expect(squares).toEqual(
    expect.arrayContaining([
      //NW
      [3, 3],
      [2, 4],
      //NE
      [6, 4],
      //SW
      [3, 7],
      //SE
      [6, 6],
      [5, 7],
    ])
  );
  expect(squares.length).toBe(6);
});

it('it should return proper moveable squares with a precise-leaping and front/back component piece', () => {
  let squares = getMoveableSquares(9, 9, 'wisp', testState.pieces);
  expect(squares).toEqual(
    expect.arrayContaining([
      [11, 9],
      [9, 7],
      [11, 11],
      [7, 11],
    ])
  );
  expect(squares.length).toBe(4);
});

it('it should return proper moveable squares with a repeated-leaping piece', () => {
  let squares = getMoveableSquares(8, 9, 'threerider', testState.pieces);
  expect(squares).toEqual(
    expect.arrayContaining([
      [11, 9],
      [5, 9],
      [8, 6],
      [8, 3],
      [8, 0],
    ])
  );
  expect(squares.length).toBe(5);
});

it('it should return proper moveable squares with two-level recursive components', () => {
  let squares = getMoveableSquares(1, 5, 'pasha', testState.pieces);
  expect(squares).toEqual(
    expect.arrayContaining([
      //N
      [1, 4],
      [1, 3],
      //S
      [1, 7],
      //E
      [2, 5],
      [3, 5],
      //W
      //NW
      //SW
      [0, 6],
      //NE
      [2, 4],
      [3, 3],
      //SE
      [3, 7],
    ])
  );
  expect(squares.length).toBe(9);
});