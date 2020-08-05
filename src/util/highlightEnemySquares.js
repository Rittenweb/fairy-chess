export default function highlightEnemySquares(squareState, moveableSquare, cappableSquares) {
  //Initialize all squares with a 'no'
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      squareState[x][y] = {
        ...squareState[x][y],
        canDrop: 'no'
      };
    }
  }

  //Mark the single square to move to, or none
  if (moveableSquare) {
    squareState[moveableSquare[0]][moveableSquare[1]] = {
      ...squareState[moveableSquare[0]][moveableSquare[1]],
      canDrop: 'yes',
    };
  }

  //Mark all the squares that can be captured, if there are any
  cappableSquares.forEach((square) => {
    squareState[square[0]][square[1]] = {
      ...squareState[square[0]][square[1]],
      canDrop: 'enemycap'
    }
  })

  return squareState
}