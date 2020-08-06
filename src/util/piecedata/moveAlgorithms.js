import MAX_MOVE from './maxMove'

function standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, direction) {
  const moveableSquares = [];
  while (distance > 0) {
    switch (direction) {
      case 'N':
        y--;
        break;
      case 'NE':
        x++;
        y--;
        break
      case 'E':
        x++;
        break;
      case 'SE':
        x++;
        y++;
        break;
      case 'S':
        y++;
        break;
      case 'SW':
        y++;
        x--;
        break;
      case 'W':
        x--;
        break;
      case 'NW':
        y--;
        x--;
        break;
      default:
        y--;
        break;
    }
    if (y < 0 || x < 0 || y >= MAX_MOVE || x >= MAX_MOVE) {
      break;
    }
    //Scenario: blocked by a piece
    if (!leaping && pieceState[x][y] !== null) {
      if (noCapture || pieceState[x][y].enemy === false) {
        break;
      }
      moveableSquares.push([x, y]);
      break;
    }

    //Skip past square-push step if leaping and piece is friendly
    if (!(leaping && pieceState[x][y] && pieceState[x][y].enemy === false)) {
      //Skip square-push step if there's a piece and you can leap over, but not capture
      if (!(leaping && noCapture && pieceState[x][y] !== null)) {
        //Skips square push step if there is no piece and onlyCapture
        if (!(onlyCapture && pieceState[x][y] === null)) {
          moveableSquares.push([x, y])
        }
      }
    }
    distance--;
  }
  return moveableSquares;
}

const moveAlgorithms = {
  N: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'N')
  },
  E: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'E')
  },
  S: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'S')
  },
  W: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'W')
  },
  NE: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'NE')

  },
  SE: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'SE')

  },
  SW: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'SW')
  },
  NW: (x, y, distance, pieceState, leaping, noCapture, onlyCapture) => {
    return standardSlide(x, y, distance, pieceState, leaping, noCapture, onlyCapture, 'NW')
  },
  //Specifies an a and b value in the 'target' parameter. The piece can reach any square whose
  //coordinates are different from its own by a magnitude of [a, b] or [b, a], negative or positive
  leap: (x, y, target, pieceState, leaping, noCapture, onlyCapture) => {
    const moveableSquares = [];
    for (let x2 = 0; x2 < MAX_MOVE; x2++) {
      for (let y2 = 0; y2 < MAX_MOVE; y2++) {
        let difX = Math.abs(x - x2);
        let difY = Math.abs(y - y2);
        if ((difX === target[0] && difY === target[1]) || (difX === target[1] && difY === target[0])) {
          //Skip if theres a friendly piece
          if (!(pieceState[x2][y2] && pieceState[x2][y2].enemy === false)) {
            //Skip if theres an enemy piece but no capture is allowed
            if (!(noCapture && pieceState[x2][y2] && pieceState[x2][y2].enemy === true)) {
              //Skip if there's no enemy piece and only capture is allowed
              if (!(onlyCapture && !(pieceState[x2][y2] && pieceState[x2][y2].enemy === true))) {
                moveableSquares.push([x2, y2]);
              }
            }
          }
        }
      }
    }
    return moveableSquares;
  },
  //Multiple tuples representing pre-signed x and y magnitudes are stored in the 'targets' parameter.
  //The piece can reach any of these individually defined targets
  preciseLeap: (x, y, targets, pieceState) => {
    const moveableSquares = [];
    targets.forEach((target) => {
      const newSquare = [x + target[0], y + target[1]];
      //Skip if the square is off the board
      if (newSquare[0] >= 0 && newSquare[0] < MAX_MOVE && newSquare[1] >= 0 && newSquare[1] < MAX_MOVE) {
        //Skip if there's a friendly piece
        if (!(pieceState[newSquare[0]][newSquare[1]] && pieceState[newSquare[0]][newSquare[1]].enemy === false)) {
          moveableSquares.push(newSquare);
        }
      }
    })
    return moveableSquares;
  },
  //Just like the 'leap' algorithm, except once the a and b magnitudes have been ordered and signed, they are
  //repeated in that arrangement from the resulting square, until the end of the board is reached.
  repeatingLeap: (x, y, target, pieceState) => {
    let moveableSquares = [];

    let posDelta1 = target[0];
    let posDelta2 = target[1];
    let negDelta1 = posDelta1 * -1;
    let negDelta2 = posDelta2 * -1;

    //To calculate the squares along the repeated leap once the a and b magnitudes are ordered, signed and passed in.
    function followLeapDirection(x, y, delta1, delta2, pieceState) {
      const squares = [];
      x += delta1;
      y += delta2;
      //Make sure the square is on the board
      while (x < MAX_MOVE && x >= 0 && y < MAX_MOVE && y >= 0) {
        //Make sure the square isn't occupied by an ally
        if (!(pieceState[x][y] && pieceState[x][y].enemy === false)) {
          squares.push([x, y]);
        }
        //Even if the square has an enemy and can be captured, the leap can't go beyond.
        if (pieceState[x][y] !== null) {
          break;
        }
        //Move to the next leap location and repeat
        x += delta1;
        y += delta2;
      }
      return squares;
    }

    //Under certain [a, b] conditions, only four directions need be calculated instead of eight
    if (posDelta1 === posDelta2) {
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, negDelta2, pieceState));
    } else if (posDelta1 === 0) {
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta2, posDelta1, pieceState));
    } else if (posDelta2 === 0) {
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta2, negDelta1, pieceState));
    } else {
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, negDelta2, negDelta1, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta2, negDelta1, pieceState));
      moveableSquares = moveableSquares.concat(followLeapDirection(x, y, posDelta1, posDelta2, pieceState));
    }
    return moveableSquares;
  },
  //The targetAndMove paremeter contains a tuple whose first value is another tuple, representing the
  //coordinates of the square to leap to, and whose second value is a sliding move to execute from the new square.
  leapThenMove: (x, y, targetAndMove, pieceState, leaping, noCapture, onlyCapture) => {
    let moveableSquares = [];

    //Get the initial leap square from which the piece will then slide
    const anchorSquare = [x + targetAndMove[0][0], y + targetAndMove[0][1]];

    //Check that the initial leap square is valid
    if (anchorSquare[0] >= 0 && anchorSquare[0] < MAX_MOVE && anchorSquare[1] >= 0 && anchorSquare[1] < MAX_MOVE) {
      if (!(pieceState[anchorSquare[0]][anchorSquare[1]] && pieceState[anchorSquare[0]][anchorSquare[1]].enemy === false)) {
        //Skip if theres a friendly piece
        if (!(pieceState[anchorSquare[0]][anchorSquare[1]] && pieceState[anchorSquare[0]][anchorSquare[1]].enemy === false)) {
          //Skip if theres an enemy piece but no capture is allowed
          if (!(noCapture && pieceState[anchorSquare[0]][anchorSquare[1]] && pieceState[anchorSquare[0]][anchorSquare[1]].enemy === true)) {
            //Skip if there's no enemy piece and only capture is allowed
            if (!(onlyCapture && !(pieceState[anchorSquare[0]][anchorSquare[1]] && pieceState[anchorSquare[0]][anchorSquare[1]].enemy === true))) {
              moveableSquares.push([anchorSquare[0], anchorSquare[1]]);
            }
          }
        }
      }
      //The anchor square is valid, now we can execute the subsequent slide
      if (pieceState[anchorSquare[0]][anchorSquare[1]] === null) {
        moveableSquares = moveableSquares.concat(moveAlgorithms[[targetAndMove[1][0]]](anchorSquare[0], anchorSquare[1], targetAndMove[1][1], pieceState, leaping, noCapture, onlyCapture));
      }
    }
    return moveableSquares;
  },
  //A bishop move, but it bounces off the first wall it reaches and continues.
  reflect: (x, y, direction, pieceState) => {
    const moveableSquares = [];
    let xdelta;
    let ydelta
    if (direction === 'NE') {
      xdelta = 1;
      ydelta = -1;
    } else if (direction === 'SE') {
      xdelta = 1;
      ydelta = 1;
    } else if (direction === 'SW') {
      xdelta = -1;
      ydelta = 1;
    } else if (direction === 'NW') {
      xdelta = -1;
      ydelta = -1;
    }
    x = x + xdelta;
    y = y + ydelta;
    //Execute the normal bishop move in the given direction
    while (x < MAX_MOVE && x >= 0 && y < MAX_MOVE && y >= 0) {
      if (!(pieceState[x][y] && pieceState[x][y].enemy === false)) {
        moveableSquares.push([x, y]);
      }
      if (pieceState[x][y] !== null) {
        break;
      }
      x = x + xdelta;
      y = y + ydelta;
    }
    //Pick up the x and y from before: if they are off the board, a reflect is needed.
    //We can tell the new direction we need based on which "wall" was hit.
    if (x < 0) {
      xdelta = xdelta * -1;
      x = 0;
      y = y + (ydelta * -1)
    } else if (x >= MAX_MOVE) {
      xdelta = xdelta * -1;
      x = MAX_MOVE - 1;
      y = y + (ydelta * -1)
    } else if (y < 0) {
      ydelta = ydelta * -1;
      y = 0;
      x = x + (xdelta * -1)
    } else if (y >= MAX_MOVE) {
      ydelta = ydelta * -1;
      y = MAX_MOVE - 1
      x = x + (xdelta * -1)
    }
    //Execute a normal bishop move in the new direction after reflection
    while (x < MAX_MOVE && x >= 0 && y < MAX_MOVE && y >= 0) {
      if (!(pieceState[x][y] && pieceState[x][y].enemy === false)) {
        moveableSquares.push([x, y]);
      }
      if (pieceState[x][y] !== null) {
        break;
      }
      x = x + xdelta;
      y = y + ydelta;
    }
    return moveableSquares;
  },
  //Any square on the board is included as long as it is unoccupied
  all: (x, y, nullArg, pieceState) => {
    const moveableSquares = [];
    for (let i = 0; i < MAX_MOVE; i++) {
      for (let j = 0; j < MAX_MOVE; j++) {
        if (pieceState[i][j] === null) {
          moveableSquares.push([i, j]);
        }
      }
    }
    return moveableSquares;
  },
  //The bugeye can move anywhere that the Queen of Night plus a Camelrider would not be
  //able to move from its position
  bugeye: (x, y, nullArg, pieceState) => {
    const moveableSquares = [];
    for (let i = 0; i < MAX_MOVE; i++) {
      for (let j = 0; j < MAX_MOVE; j++) {
        let difx = Math.abs(x - i);
        let dify = Math.abs(y - j)
        //This long conditional hardcodes the bishop, rook, nightrider and camelrider algorithms
        //If any of them would pass, the square is skipped. Else, it's included.
        if (i !== x && j !== y && difx !== dify && !(dify / difx === 2) && !(difx / dify === 2) && !(dify / difx === 3) && !(difx / dify === 3)) {
          if (!(pieceState[i][j] && pieceState[i][j].enemy === false)) {
            moveableSquares.push([i, j]);
          }
        }
      }
    }
    return moveableSquares;
  }
}

export default moveAlgorithms