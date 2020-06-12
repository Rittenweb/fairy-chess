import React from 'react';
import BenchSquare from './BenchSquare';
import ReadyButton from './ReadyButton';
import { getRarity } from './pieceData';

let rareMaxed;
let uncommonMaxed;
let commonMaxed;

function renderSquare(squareNum, gameState) {
  const piece = gameState.benchPieces[squareNum];
  let canDrag = true;
  if (piece) {
    let rarity = getRarity(piece.name);
    if (rarity === 3 && rareMaxed) {
      canDrag = false;
    } else if (rarity === 2 && uncommonMaxed) {
      canDrag = false;
    } else if (rarity === 1 && commonMaxed) {
      canDrag = false;
    }
  }
  if (gameState.gamePhase !== 'setup') {
    canDrag = false;
  }
  return (
    <BenchSquare
      key={squareNum}
      num={squareNum}
      piece={piece}
      canDrag={canDrag}
    />
  );
}

export default function Bench({ gameState }) {
  if (gameState.gamePhase === 'setup') {
    let rareMax = 1;
    let uncommonMax = 2;
    let commonMax = 3;
    rareMaxed = false;
    uncommonMaxed = false;
    commonMaxed = false;
    for (let x = 0; x < 12; x++) {
      for (let y = 0; y < 12; y++) {
        let piece = gameState.pieces[x][y];
        if (piece) {
          if (getRarity(piece.name) === 3) {
            rareMax--;
            if (rareMax <= 0) {
              rareMaxed = true;
            }
          } else if (getRarity(piece.name) === 2) {
            uncommonMax--;
            if (uncommonMax <= 0) {
              uncommonMaxed = true;
            }
          } else if (getRarity(piece.name) === 1) {
            commonMax--;
            if (commonMax <= 0) {
              commonMaxed = true;
            }
          }
        }
      }
    }
  }

  const squareList = [];
  for (let i = 0; i < 16; i++) {
    squareList.push(renderSquare(i, gameState));
  }
  return (
    <>
      <div className='bench'>{squareList}</div>
      {gameState.gamePhase === 'setup' &&
        rareMaxed &&
        uncommonMaxed &&
        commonMaxed && <ReadyButton />}
    </>
  );
}
