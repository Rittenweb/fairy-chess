export default function fillBenchAfterWin(currentBenchPieces, boardPieces) {
  let newBenchPieces = [];
  //First, put all pieces still on the bench into the new bench array
  currentBenchPieces.forEach((piece) => {
    if (piece) {
      newBenchPieces.push(piece)
    }
  })
  //Then, put all pieces on the board into the new bench array
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      if (boardPieces[x][y] && boardPieces[x][y].enemy === false) {
        newBenchPieces.push(boardPieces[x][y])
      }
    }
  }
  newBenchPieces = newBenchPieces.sort((a, b) => a.id - b.id) //Make sure they stay in order
  newBenchPieces.forEach((piece, i) => piece.id = i) //Hard reset their ids in case pieces have been lost
  return newBenchPieces
}