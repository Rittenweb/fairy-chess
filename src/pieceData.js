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
  let piece = pieceDefs[pieceName];
  if (piece.components) {
    let components = piece.components;
    components.forEach((component) => {
      moveTypes = moveTypes.concat(pieceDefs[component]["move"] || []);
      moveNoCapTypes = moveNoCapTypes.concat(pieceDefs[component]["moveNoCap"] || []);
      capNoMoveTypes = capNoMoveTypes.concat(pieceDefs[component]["capNoMove"] || []);
    })
  }
  if (piece.frontComponents) {
    let components = piece.frontComponents;
    let tempMoveableSquares = []
    components.forEach((component) => {
      let tempMoveTypes = pieceDefs[component]["move"] || [];
      let tempMoveNoCapTypes = pieceDefs[component]["moveNoCap"] || [];
      let tempCapNoMoveTypes = pieceDefs[component]["capNoMove"] || [];
      tempMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
      })
      tempMoveNoCapTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
      })
      tempCapNoMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
      })
    })
    moveableSquares = moveableSquares.concat(tempMoveableSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }))
  }
  if (piece.backComponents) {
    let components = piece.backComponents;
    let tempMoveableSquares = []
    components.forEach((component) => {
      let tempMoveTypes = pieceDefs[component]["move"] || [];
      let tempMoveNoCapTypes = pieceDefs[component]["moveNoCap"] || [];
      let tempCapNoMoveTypes = pieceDefs[component]["capNoMove"] || [];
      tempMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
      })
      tempMoveNoCapTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
      })
      tempCapNoMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
      })
    })
    moveableSquares = moveableSquares.concat(tempMoveableSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }))
  }

  moveTypes = moveTypes.concat(pieceDefs[pieceName]["move"] || []);
  moveNoCapTypes = moveNoCapTypes.concat(pieceDefs[pieceName]["moveNoCap"] || []);
  capNoMoveTypes = capNoMoveTypes.concat(pieceDefs[pieceName]["capNoMove"] || []);

  moveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
  })
  moveNoCapTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
  })
  capNoMoveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
  })
  return moveableSquares;
};

const moveAlgorithms = {
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
  },
  preciseLeap: (x, y, targets) => {
    const moveableSquares = [];
    targets.forEach((target) => {
      moveableSquares.push([x + target[0], y + target[1]])
    })
    return moveableSquares;
  },
  repeatingLeap: (x, y, target, pieceState) => {
    let moveableSquares = [];

    let posDelta1 = target[0];
    let posDelta2 = target[1];
    let negDelta1 = posDelta1 * -1;
    let negDelta2 = posDelta2 * -1;

    const helper = function helper(x, y, delta1, delta2, pieceState) {
      const squares = [];
      x += delta1;
      y += delta2;
      while (x < MAX_MOVE && x >= 0 && y < MAX_MOVE && y >= 0) {
        squares.push([x, y]);
        if (pieceState[x][y] !== null) {
          break;
        }
        x += delta1;
        y += delta2;
      }
      return squares;
    }

    moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, posDelta2, pieceState));
    moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, posDelta2, pieceState));
    moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, negDelta2, pieceState));
    moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, negDelta2, pieceState));
    if (posDelta1 === posDelta2) {
      return moveableSquares
    }
    moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, posDelta1, pieceState));
    moveableSquares = moveableSquares.concat(helper(x, y, negDelta2, posDelta1, pieceState));
    moveableSquares = moveableSquares.concat(helper(x, y, negDelta2, negDelta1, pieceState));
    moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, negDelta1, pieceState));

    return moveableSquares;
  },
  leapThenMove: (x, y, targetAndMove, pieceState) => {
    let moveableSquares = [];

    const anchorSquare = [x + targetAndMove[0][0], y + targetAndMove[0][1]];
    moveableSquares.push(anchorSquare);
    if (pieceState[anchorSquare[0]][anchorSquare[1]] === null) {
      moveableSquares = moveableSquares.concat(moveAlgorithms[[targetAndMove[1][0]]](anchorSquare[0], anchorSquare[1], targetAndMove[1][1], pieceState));
    }
    return moveableSquares;
  }
}

const pieceDefs = {
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
  hunter: {
    frontComponents: ["rook"],
    backComponents: ["bishop"],
    rarity: 2
  },
  falcon: {
    move: [
      ['NW', MAX_MOVE, false],
      ['NE', MAX_MOVE, false],
      ['S', MAX_MOVE, false]
    ],
    rarity: 2
  },
  giraffe: {
    move: [
      ['leap', [4, 1]]
    ],
    rarity: 2
  },
  zebra: {
    move: [
      ['leap', [3, 2]]
    ],
    rarity: 2
  },
  bull: {
    move: [
      ['leap', [3, 4]]
    ],
    rarity: 2
  },
  camel: {
    move: [
      ['leap', [3, 1]]
    ],
    rarity: 2
  },
  sword: {
    move: [
      ['N', MAX_MOVE, false],
      ['S', MAX_MOVE, false],
      ['E', 1, false],
      ['W', 1, false]
    ],
    rarity: 2
  },
  shield: {
    move: [
      ['E', MAX_MOVE, false],
      ['W', MAX_MOVE, false],
      ['N', 1, false],
      ['S', 1, false]
    ]
  },
  picket: {
    move: [
      ["leapThenMove", [
        [2, 2],
        ["SE", MAX_MOVE]
      ]],
      ["leapThenMove", [
        [2, -2],
        ["NE", MAX_MOVE]
      ]],
      ["leapThenMove", [
        [-2, 2],
        ["SW", MAX_MOVE]
      ]],
      ["leapThenMove", [
        [-2, -2],
        ["NW", MAX_MOVE]
      ]],
    ],
    rarity: 2
  },
  knight: {
    move: [
      ["leap", [2, 1]]
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
  skiprook: {
    move: [
      ['repeatingLeap', [2, 0]]
    ],
    rarity: 2
  },
  nightrider: {
    move: [
      ['repeatingLeap', [2, 1]]
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
  anticorn: {
    move: [
      ['leapThenMove', [
        [1, 2],
        ["NE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -2],
        ["SE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -2],
        ["SW", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 2],
        ["NW", MAX_MOVE]
      ]],
    ],
    rarity: 2
  },
  ship: {
    move: [
      ['leapThenMove', [
        [1, 1],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -1],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 1],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -1],
        ['N', MAX_MOVE]
      ]],
    ],
    rarity: 3
  },
  squrrel: {
    move: [
      ["N", 3, false],
      ["E", 3, false],
      ["S", 3, false],
      ["W", 3, false],
      ["NE", 3, false],
      ["SE", 3, false],
      ["SW", 3, false],
      ["NW", 3, false],
    ],
    rarity: 3
  },
  unicorn: {
    move: [
      ['leapThenMove', [
        [1, 2],
        ["SE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, 1],
        ["SE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -2],
        ["NE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, -1],
        ["NE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -2],
        ["NW", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, -1],
        ["NW", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 2],
        ["SW", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, 1],
        ["SW", MAX_MOVE]
      ]],
    ],
    rarity: 3
  },
  plus: {
    components: ['berolina'],
    capNoMove: [
      ['E', 1, false],
      ['W', 1, false]
    ],
    rarity: 1
  },
  silver: {
    components: ['ferz'],
    move: [
      ['N', 1, false]
    ],
    rarity: 1
  },
  golden: {
    components: ['centurion'],
    move: [
      ['E', 1, false],
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
  antelope: {
    components: ['dababba', 'trebuchet'],
    rarity: 2
  },
  moon: {
    components: ['ferz', 'dababba'],
    rarity: 2
  },
  frog: {
    components: ['ferz', 'trebuchet'],
    rarity: 2
  },
  phoenix: {
    components: ['wazir', 'alfil'],
    rarity: 2
  },
  mastodon: {
    components: ['king', 'alfil'],
    rarity: 2
  },
  cannon: {
    components: ['king', 'dababba'],
    rarity: 2
  },
  lance: {
    components: ['king'],
    move: [
      ['N', MAX_MOVE, false]
    ],
    rarity: 2
  },
  leopard: {
    components: ['bishop', 'wazir'],
    rarity: 2
  },
  wizard: {
    components: ['ferz', 'camel'],
    rarity: 2
  },
  champion: {
    components: ['wazir', 'dababba', 'alfil'],
    rarity: 2
  },
  gaja: {
    components: ['dababba', 'alfil', 'knight'],
    rarity: 2
  },
  wildebeast: {
    components: ['knight', 'camel'],
    rarity: 2
  },
  lion: {
    components: ['trebuchet', 'camel'],
    rarity: 2
  },
  hawk: {
    components: ['dababba', 'trebuchet', 'alfil', 'tripper'],
    rarity: 2
  },
  whale: {
    components: ['hunter'],
    move: [
      ["S", MAX_MOVE, false]
    ]
  },
  scepter: {
    components: ['king', 'sword'],
    rarity: 2
  },
  whitehorse: {
    components: ['falcon'],
    move: ['N', MAX_MOVE, false],
    rarity: 2
  },
  buffalo: {
    components: ['knight', 'camel', 'zebra'],
    rarity: 2
  },
  lynx: {
    components: ['ferz', 'alfil', 'knight'],
    rarity: 2
  },
  fortress: {
    components: ['bishop', 'dababba'],
    rarity: 2
  },
  tiger: {
    components: ['rook', 'ferz'],
    rarity: 2
  },
  pasha: {
    components: ['ferz', 'wazir', 'dababba', 'alfil'],
    rarity: 3
  },
  master: {
    components: ['knight', 'ferz', 'wazir', 'alfil', 'tripper'],
    rarity: 3
  },
  spider: {
    components: ['ferz', 'alfil', 'dababba', 'knight'],
    rarity: 3
  },
  dragon: {
    components: ['squirrel', 'knight'],
    rarity: 3
  },
  rose: {
    components: ['knight'],
    move: [
      ['leap', [4, 0]],
      ['leap', [4, 4]],
      ['leap', [2, 5]]
    ],
    rarity: 3
  },
  princess: {
    components: ['bishop', 'knight'],
    rarity: 3
  },
  empress: {
    components: ['rook', 'knight'],
    rarity: 3
  },
  boar: {
    components: ['bishop'],
    move: [
      ['E', MAX_MOVE, false],
      ['W', MAX_MOVE, false]
    ],
    rarity: 3
  },
  ox: {
    components: ['bishop'],
    move: [
      ['N', MAX_MOVE, false],
      ['S', MAX_MOVE, false]
    ],
    rarity: 3
  },
  eagle: {
    components: ['rook'],
    move: [
      ['SE', MAX_MOVE, false],
      ['SW', MAX_MOVE, false]
    ],
    rarity: 3
  },
  gryphon: {
    components: ['ship'],
    move: [
      ['leapThenMove', [
        [1, 1],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -1],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 1],
        ['W', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -1],
        ['W', MAX_MOVE]
      ]],
    ]
  },
  glatisant: {
    components: ['bishop'],
    move: [
      ['E', MAX_MOVE, false],
      ['S', MAX_MOVE, false],
      ['W', MAX_MOVE, false]
    ],
    rarity: 3
  },
  queen: {
    components: ['bishop', 'rook'],
    rarity: 3
  },
  amazon: {
    components: ['knight', 'rook', 'bishop'],
    rarity: 3
  }
}

export default getMoveableSquares;