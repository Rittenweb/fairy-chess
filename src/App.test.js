import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
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
} from './pieceData';
import { testState } from './testStates';

it('renders without crashing', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Fairy Chess/i);
  expect(linkElement).toBeInTheDocument();
});

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
