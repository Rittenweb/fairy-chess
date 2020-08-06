import enemyPieceDefs from '../piecedata/enemyPieceDefs'

//Return an array of squares that look like [xMoveValue, yMoveValue]
export default function getAllEnemyCapSquaresRelative(pieceName) {
  //Make a deep clone of the nested object so subsequent operations don't mutate the original
  let enemyPiece = JSON.parse(JSON.stringify(enemyPieceDefs[pieceName]))
  return enemyPiece.cap
}