import React from 'react';
import BenchSquare from './BenchSquare';
import ReadyButton from './ReadyButton';
import { getRarity } from './pieceData';

let ready;

function renderSquare(squareNum, gameState, rareNum, uncommonNum, commonNum) {
  const piece = gameState.benchPieces[squareNum];
  let canDrag;
  if (piece) {
    let rarity = getRarity(piece.name);
    if (rarity === 3 && rareNum >= 1) {
      canDrag = false;
    } else if (rarity === 2 && uncommonNum >= 2) {
      canDrag = false;
    } else if (rarity === 1 && commonNum >= 3) {
      canDrag = false;
    } else {
      canDrag = true;
    }
  }
  if (gameState.gamePhase !== 'setup') {
    canDrag = false;
  }
  if (canDrag) {
    ready = false;
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
  let rareNum = 0;
  let uncommonNum = 0;
  let commonNum = 0;
  if (gameState.gamePhase === 'setup') {
    for (let x = 0; x < 12; x++) {
      for (let y = 0; y < 12; y++) {
        let piece = gameState.pieces[x][y];
        if (piece) {
          if (getRarity(piece.name) === 3) {
            rareNum++;
          } else if (getRarity(piece.name) === 2) {
            uncommonNum++;
          } else if (getRarity(piece.name) === 1) {
            commonNum++;
          }
        }
      }
    }
    ready = true;
  }

  const squareList = [];
  for (let i = 0; i < 16; i++) {
    squareList.push(
      renderSquare(i, gameState, rareNum, uncommonNum, commonNum)
    );
  }
  return (
    <>
      <div className='bench'>{squareList}</div>
      <ReadyButton
        ready={ready}
        rareNum={rareNum}
        uncommonNum={uncommonNum}
        commonNum={commonNum}
        show={gameState.gamePhase === 'setup'}
      />
    </>
  );
}
