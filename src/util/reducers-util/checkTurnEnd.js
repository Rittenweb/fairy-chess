export default function checkTurnEnd(pieceState) {
  let turnShouldEnd = true;
  let enemiesOnBoard = false;
  for (let column in pieceState) {
    for (let row in pieceState[column]) {
      let piece = pieceState[column][row];
      //If any of your own pieces have yet to move, the turn should not end
      if (piece && piece.enemy === false && piece.exhausted === false) {
        turnShouldEnd = false
      }
      //Keep track of if there are any enemies. If there aren't the turn should end.
      else if (piece && piece.enemy === true) {
        enemiesOnBoard = true;
      }
    }
  }

  if (!enemiesOnBoard) {
    turnShouldEnd = true;
  }
  return turnShouldEnd
}