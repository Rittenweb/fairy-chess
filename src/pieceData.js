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

const MAX_MOVE = 12;


const getMoveableSquares = function getMoveableSquares(x, y, pieceName, pieceState) {
  let moveableSquares = [];
  let moveTypes = [];
  if (compoundPieces[pieceName]) {
    let basePieceMoveArrays = compoundPieces[pieceName]["move"].map((componentPieceName) => {
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
    moveableSquares = moveableSquares.concat(baseAlgs[moveType[0]](x, y, moveType[1], pieceState, moveType[2]))
  })
  return moveableSquares;
};

const baseAlgs = {
  N: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      y--
      if (y < 0) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  E: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++
      if (x > 11) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  S: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      y++;
      if (y >= MAX_MOVE) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  W: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      x--
      if (x < 0) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares;
  },
  NE: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++;
      y--;
      if (x >= MAX_MOVE || y < 0) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares
  },
  SE: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++;
      y++;
      if (x >= MAX_MOVE || y >= MAX_MOVE) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares
  },
  SW: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      x--;
      y++;
      if (x < 0 || y >= MAX_MOVE) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares
  },
  NW: (x, y, distance, pieceState, leaping) => {
    const moveableSquares = [];
    while (distance > 0) {
      x--;
      y--;
      if (x < 0 || y < 0) {
        break;
      }
      if (!leaping && pieceState[x][y] !== null) {
        moveableSquares.push([x, y]);
        break;
      }
      moveableSquares.push([x, y]);
      distance--;
    }
    return moveableSquares
  },
  leap: (x, y, target) => {
    const moveableSquares = [];
    for (let x2 = 0; x2 < MAX_MOVE; x2++) {
      for (let y2 = 0; y2 < MAX_MOVE; y2++) {
        let difX = Math.abs(x - x2);
        let difY = Math.abs(y - y2);
        if ((difX === target[0] && difY === target[1]) || (difX === target[1] && difY === target[0])) {
          moveableSquares.push([x2, y2]);
        }
      }
    }
    return moveableSquares;
  }
}

//   'leaper': function leaper(moveSquare, startingSquare, leapA, leapB) {
//     let difX = Math.abs(moveSquare.x - startingSquare.x);
//     let difY = Math.abs(moveSquare.y - startingSquare.y);
//     if ((difX === leapA && difY === leapB) || (difX === leapB && difY === leapB)) {
//       return true;
//     }
//     return false;
//   },

const basePieces = {
  "berolina": {
    "move": 'berolina',
    "icon": "berolina.svg",
    "rarity": 1
  },
  "knight": {
    "move": [
      ["leap", [2, 1]]
    ],
    "icon": "knight.svg",
    "rarity": 2
  },
  "rook": {
    "move": [
      ["N", MAX_MOVE, false],
      ["E", MAX_MOVE, false],
      ["S", MAX_MOVE, false],
      ["W", MAX_MOVE, false]
    ],
    "icon": "rook.svg",
    'rarity': 2
  },
  "bishop": {
    "move": [
      ["NE", MAX_MOVE, false],
      ["SE", MAX_MOVE, false],
      ["SW", MAX_MOVE, false],
      ["NW", MAX_MOVE, false]
    ],
    'icon': 'bishop.svg',
    'rarity': 2
  },
  "king": {
    "move": [
      ["N", 1, false],
      ["E", 1, false],
      ["S", 1, false],
      ["W", 1, false],
      ["NE", 1, false],
      ["SE", 1, false],
      ["SW", 1, false],
      ["NW", 1, false],
    ]
  }
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