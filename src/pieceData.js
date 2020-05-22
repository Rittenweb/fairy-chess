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
  let moveNoCapTypes = [];
  let capNoMoveTypes = [];
  if (compoundPieces[pieceName]) {
    let components = compoundPieces[pieceName]["components"];
    components.forEach((component) => {
      moveTypes = moveTypes.concat(basePieces[component]["move"] || []);
      moveNoCapTypes = moveNoCapTypes.concat(basePieces[component]["moveNoCap"] || []);
      capNoMoveTypes = capNoMoveTypes.concat(basePieces[component]["capNoMove"] || []);
    })
  } else {
    moveTypes = basePieces[pieceName]["move"] || [];
    moveNoCapTypes = basePieces[pieceName]["moveNoCap"] || [];
    capNoMoveTypes = basePieces[pieceName]["capNoMove"] || [];
  }
  moveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(baseAlgs[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
  })
  moveNoCapTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(baseAlgs[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
  })
  capNoMoveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(baseAlgs[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
  })
  return moveableSquares;
};

const baseAlgs = {
  N: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      y--
      if (y < 0) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  E: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++
      if (x >= MAX_MOVE) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  S: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      y++
      if (y >= MAX_MOVE) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  W: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      x--
      if (x < 0) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  NE: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++
      y--
      if (y < 0 || x >= MAX_MOVE) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  SE: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      x++;
      y++;
      if (y >= MAX_MOVE || x >= MAX_MOVE) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  SW: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      y++;
      x--;
      if (x < 0 || y >= MAX_MOVE) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
  },
  NW: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    while (distance > 0) {
      y--;
      x--;
      if (y < 0 || x < 0) {
        break;
      }
      //Scenario: blocked by a piece
      if (!leaping && pieceState[x][y] !== null) {
        if (noCapture) {
          break;
        }
        moveableSquares.push([x, y]);
        break;
      }
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
      distance--;
    }
    return moveableSquares;
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

const basePieces = {
  pawn: {
    moveNoCap: [
      ["N", 1, false]
    ],
    capNoMove: [
      ["NE", 1, false],
      ["NW", 1, false]
    ],
    rarity: 1
  },
  berolina: {
    moveNoCap: [
      ["NE", 1, false],
      ["NW", 1, false]
    ],
    capNoMove: [
      ["N", 1, false]
    ],
    rarity: 1
  },
  wazir: {
    move: [
      ["N", 1, false],
      ["E", 1, false],
      ["S", 1, false],
      ["W", 1, false],
    ],
    rarity: 1
  },
  trebuchet: {
    move: [
      ["leap", [3, 0]]
    ],
    rarity: 1
  },
  dababba: {
    move: [
      ['leap', [2, 0]]
    ],
    rarity: 1
  },
  ferz: {
    move: [
      ["NE", 1, false],
      ["SE", 1, false],
      ["SW", 1, false],
      ["NW", 1, false],
    ],
    rarity: 1
  },
  centurion: {
    move: [
      ["NW", 1, false],
      ["N", 1, false],
      ["NE", 1, false],
    ],
    rarity: 1
  },
  tripper: {
    move: [
      ['leap', [3, 3]]
    ],
    rarity: 1
  },
  alfil: {
    move: [
      ['leap', [2, 2]]
    ]
  },
  king: {
    move: [
      ["N", 1, false],
      ["E", 1, false],
      ["S", 1, false],
      ["W", 1, false],
      ["NE", 1, false],
      ["SE", 1, false],
      ["SW", 1, false],
      ["NW", 1, false],
    ],
    rarity: 1
  },
  knight: {
    move: [
      ["leap", [2, 1]]
    ],
    rarity: 2
  },
  rook: {
    move: [
      ["N", MAX_MOVE, false],
      ["E", MAX_MOVE, false],
      ["S", MAX_MOVE, false],
      ["W", MAX_MOVE, false]
    ],
    rarity: 2
  },
  bishop: {
    move: [
      ["NE", MAX_MOVE, false],
      ["SE", MAX_MOVE, false],
      ["SW", MAX_MOVE, false],
      ["NW", MAX_MOVE, false]
    ],
    rarity: 2
  },
}

const compoundPieces = {
  plus: {
    components: ['berolina', ['E', 1, false],
      ['W', 1, false]
    ],
    move: ['E', 1, false],
    rarity: 1
  },
  silver: {
    components: ['ferz', ['N', 1, false]],
    rarity: 1
  },
  golden: {
    components: ['centurion', ['E', 1, false],
      ['W', 1, false]
    ],
    rarity: 1
  },
  machine: {
    components: ['wazir', 'dababba'],
    rarity: 1
  },
  elephant: {
    components: ['ferz', 'alfil'],
    rarity: 1
  },
  queen: {
    components: ['bishop', 'rook'],
    rarity: 3
  }
}

export default getMoveableSquares;