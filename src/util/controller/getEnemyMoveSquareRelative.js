import enemyPieceDefs from '../piecedata/enemyPieceDefs'

//Return a square in form [xMoveValue, yMoveValue]
export default function getEnemyMoveSquareRelative(pieceName) {
  return [0, enemyPieceDefs[pieceName].move]
}