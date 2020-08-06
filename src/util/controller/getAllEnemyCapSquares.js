import MAX_MOVE from '../piecedata/maxMove'
import enemyPieceDefs from '../piecedata/enemyPieceDefs'

//Return an array of all squares this enemy can capture at, at static coordinates
export default function getAllEnemyCapSquares(x, y, pieceState) {
  const piece = enemyPieceDefs[pieceState[x][y].name];
  let cappableSquares = piece.cap;
  let result = cappableSquares.reduce((acc, square) => {
    let newX = x + square[0];
    let newY = y + square[1];
    //Disregard whether a player piece is on the square--this method is for highlighting
    if (newX >= 0 && newX < MAX_MOVE && newY >= 0 && newY < MAX_MOVE) {
      return acc.concat([
        [newX, newY]
      ])
    } else {
      return acc;
    }
  }, [])
  return result;
}