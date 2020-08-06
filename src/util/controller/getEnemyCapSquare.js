import MAX_MOVE from '../piecedata/maxMove'
import pieceDefs from '../piecedata/pieceDefs'
import enemyPieceDefs from '../piecedata/enemyPieceDefs'

//Return the square the enemy should capture at, or if it shouldn't, undefined
export default function getEnemyCapSquare(x, y, pieceState) {
  const piece = enemyPieceDefs[pieceState[x][y].name];
  let cappableSquares = piece.cap; //An array of coordinates relative to starting square

  //Turn the array into a shorter array of static square coordinates
  cappableSquares = cappableSquares.reduce(enemyCapSquaresReducer, [])
  if (!cappableSquares.length) {
    return;
  }

  function enemyCapSquaresReducer(acc, square) {
    let newX = x + square[0];
    let newY = y + square[1];
    //Only include the square if it is on the board, and contains a player piece
    if (newX >= 0 && newX < MAX_MOVE && newY >= 0 && newY < MAX_MOVE && pieceState[newX][newY] && pieceState[newX][newY].enemy === false) {
      return acc.concat([
        [newX, newY]
      ])
    } else {
      return acc;
    }
  }

  //Divide the valid squares based on the rarity of player piece on them
  let rareSquares = cappableSquares.filter((square) => {
    return pieceState[square[0]][square[1]] && pieceDefs[pieceState[square[0]][square[1]].name].rarity === 3;
  })
  let uncommonSquares = cappableSquares.filter((square) => {
    return pieceState[square[0]][square[1]] && pieceDefs[pieceState[square[0]][square[1]].name].rarity === 2;
  })
  let commonSquares = cappableSquares.filter((square) => {
    return pieceState[square[0]][square[1]] && pieceDefs[pieceState[square[0]][square[1]].name].rarity === 1;
  })

  //Enemy AI should prioritze player pieces of higher rarity to take
  if (rareSquares.length) {
    return rareSquares[Math.floor(Math.random() * rareSquares.length)];
  } else if (uncommonSquares.length) {
    return uncommonSquares[Math.floor(Math.random() * uncommonSquares.length)];
  } else if (commonSquares.length) {
    return commonSquares[Math.floor(Math.random() * commonSquares.length)];
  } else {
    return
  }
}