import enemyPieceDefs from '../piecedata/enemyPieceDefs'

//Returns the coordinates of square that the enemy piece should move to
export default function getEnemyMoveSquare(x, y, pieceState) {
  let pieceMoveDistance = enemyPieceDefs[pieceState[x][y].name].move;
  do {
    //If square at the max move distance is empty
    if (pieceState[x][y + pieceMoveDistance] === null) {
      return [x, y + pieceMoveDistance];
    }
    //Square is occupied, check at a square one closer
    pieceMoveDistance--;
  } while (pieceMoveDistance > 0)
}