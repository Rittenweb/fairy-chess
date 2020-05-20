// 0: Nothing
// 1: Piece
// 2: Move and Capture
// 3: Move but not capture
// 4: Capture but not move
// 5: Damage space
// 6: Auto-capture space

//Matrix
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


// Helper
// 40 41 42 43 44
// 30 31 32 33 34
// 20 21 22 23 24
// 10 11 12 13 14
// 00 01 02 03 04



const getMoveableSquares = function getMoveableSquares(x, y, pieceName, pieceState) {
  let moveableSquares = [];
  let moveTypes = [];
  if (compoundPieces[pieceName]) {
    let basePieceMoveArrays = compoundPieces[pieceName].map((componentPieceName) => {
      return basePieces[componentPieceName]["move"]
    });
    basePieceMoveArrays.forEach((moveArray) => {
      moveArray.forEach((moveType) => {
        moveTypes.push(moveType)
      })
    });
  } else {
    moveTypes = basePieces[pieceName]["move"];
  }
  moveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(baseAlgs[moveType[0]](x, y, moveType[1], pieceState))
  })
  return moveableSquares;
};

const baseAlgs = {
  N: (x, y, distance, pieceState) => {
    const moveableSquares = [];
    while (distance > 0) {
      y++
      if (y > 11) {
        break;
      }
      if (pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  E: (x, y, distance, pieceState) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++
      if (x > 11) {
        break;
      }
      if (pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  S: (x, y, distance, pieceState) => {
    const moveableSquares = [];
    while (distance > 0) {
      y--
      if (y < 0) {
        break;
      }
      if (pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  W: (x, y, distance, pieceState) => {
    const moveableSquares = [];
    while (distance > 0) {
      x--
      if (x < 0) {
        break;
      }
      if (pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  }
}

const basePieces = {
  "berolina": {
    "move": 'berolina',
    "icon": "berolina.svg",
    "rarity": 1
  },
  "knight": {
    "move": [2, 1],
    "icon": "knight.svg",
    "rarity": 2
  },
  "rook": {
    "move": [
      ["N", 12],
      ["E", 12],
      ["S", 12],
      ["W", 12]
    ],
    "icon": "rook.svg",
    'rarity': 2
  },
  "bishop": {
    "move": [
      ["NE", 12],
      ["SE", 12],
      ["SW", 12],
      ["NW", 12]
    ],
    'icon': 'bishop.svg',
    'rarity': 2
  },
}

const compoundPieces = {
  "queen": {
    "move": ['bishop', 'rook'],
    'icon': 'queen.svg',
    'rarity': 3
  }
}

export default getMoveableSquares;

// const moveTypes = {
//   'leaper': function leaper(moveSquare, startingSquare, leapA, leapB) {
//     let difX = Math.abs(moveSquare.x - startingSquare.x);
//     let difY = Math.abs(moveSquare.y - startingSquare.y);
//     if ((difX === leapA && difY === leapB) || (difX === leapB && difY === leapB)) {
//       return true;
//     }
//     return false;
//   },
//   'bishop': function bishop(moveSquare, startingSquare) {
//     let difX = Math.abs(moveSquare.x - startingSquare.x);
//     let difY = Math.abs(moveSquare.y - startingSquare.y);
//     if (difX === difY) {
//       return true;
//     }
//     return false
//   },
//   'rook': function rook(moveSquare, startingSquare) {
//     if (moveSquare.x === startingSquare.x) {
//       return true;
//     } else if (moveSquare.y === startingSquare.y) {
//       return true;
//     }
//     return false;
//   },
// }