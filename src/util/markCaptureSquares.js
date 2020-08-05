import {
  getAllEnemyCapSquares
} from './pieceData'

export default function markCaptureSquares(pieceState, squareState, squaresClone) {
  let squares = []; //Hold all squares that should have a capture mark

  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {

      //If there's an enemy, call the method to add its capture squares to the array
      if (pieceState[x][y] && pieceState[x][y].enemy === true) {
        squares = squares.concat(getAllEnemyCapSquares(x, y, pieceState));
      }

      //On every square, enemy or not, initialize the capture mark as false
      squareState[x][y].captureMark = false;
      squaresClone[x][y].captureMark = false;
    }
  }

  //Overwrite the 'false' capture marks for the squares stored in the array
  squares.forEach((square) => {
    squareState[square[0]][square[1]].captureMark = true;
    squaresClone[square[0]][square[1]].captureMark = true;
  })

  return [squareState, squaresClone]
}