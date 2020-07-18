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
import initialState from './baseStates';

it('renders banner', () => {
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
