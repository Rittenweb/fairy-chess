import {
  getEnemyCapSquare,
  getEnemyMoveSquare
} from './pieceData'

export default function takeEnemyTurn(pieceState, enemyCount) {

  let oldState = JSON.parse(JSON.stringify(pieceState)) //Keep reference for when some pieces have moved and others haven't

  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      //Find all enemy pieces
      if (oldState[x][y] && oldState[x][y].enemy === true) {

        pieceState[x][y].fade = 'in'; //For enemies about to move, this sets their animation
        enemyCount++;

        let capSquare = getEnemyCapSquare(x, y, pieceState); //Decide where the enemy should capture, if anywhere
        if (capSquare) {
          pieceState[capSquare[0]][capSquare[1]] = pieceState[x][y] //Put in new location
          pieceState[x][y] = null; //Clear prior location
        }

        //If the enemy isn't capturing, it moves instead
        else {
          let newSquare = getEnemyMoveSquare(x, y, pieceState);
          if (newSquare) {
            pieceState[newSquare[0]][newSquare[1]] = pieceState[x][y]
            pieceState[x][y] = null
          }
        }
      }

      //If the piece is an ally, change it from exhausted to ready
      else if (pieceState[x][y] && pieceState[x][y].enemy === false) {
        pieceState[x][y].exhausted = false;
      }
    }
  }

  return [pieceState, enemyCount]
}