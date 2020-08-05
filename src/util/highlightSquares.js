export default function highlightSquares(squareState, pieceState, moveableSquares) {

  //Initialize all squares to a 'no' (which is different than an undefined)
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      squareState[x][y] = {
        ...squareState[x][y],
        canDrop: 'no'
      };
    }
  }

  //Overwrite the 'no's that are referenced in the squares array
  for (const square of moveableSquares) {
    let [x, y] = [square[0], square[1]]
    //Capturing is a different color than moving, so check if an enemy is present
    let dropType = (pieceState[x][y] && pieceState[x][y].enemy === true) ? 'cap' : 'yes'
    squareState[x][y] = {
      ...squareState[x][y],
      canDrop: dropType
    };
  }

  return squareState
}