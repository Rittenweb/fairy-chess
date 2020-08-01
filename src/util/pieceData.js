const MAX_MOVE = 12;

export const getRarity = function getRarity(pieceName) {
  return pieceDefs[pieceName].rarity;
}

//Returns a piece-representative object with three properties:
//Its NAME is randomly chosen from all names that match the specified rarity
//Its ENEMY is set to false, because this method is used for ally bench population
//Its ID is set to the parameter-specified id, so that the bench pieces stay in order
export const getPieceWithRarity = function getPieceWithRarity(rarity, id) {
  let pieceNames = Object.keys(pieceDefs);
  let pieceName = pieceNames[Math.floor(pieceNames.length * Math.random())];
  //It is slower on average to iterate through the pieceDefs object and separate it by rarity
  //than just hope we get the right rarity within a few attempts
  while (pieceDefs[pieceName].rarity !== rarity) {
    pieceName = pieceNames[Math.floor(pieceNames.length * Math.random())];
  }
  return {
    name: pieceName,
    enemy: false,
    id: id
  };
}

//Returns the coordinates of square that the enemy piece should move to
export const getEnemyMoveSquare = function getEnemyMoveSquare(x, y, pieceState) {
  let pieceMoveDistance = enemyPieceDefs[pieceState[x][y].name].move;
  do {
    //If square at the max move distance is empty
    if (pieceState[x][y + pieceMoveDistance] === null) {
      return [x, y + pieceMoveDistance];
    }
    //Square is occupied, check at a square one closer
    pieceMoveDistance--;
  } while (pieceMoveDistance > 0)
}

//Return a square in form [xMoveValue, yMoveValue]
export const getEnemyMoveSquareRelative = function getEnemyMoveSquareRelative(pieceName) {
  return [0, enemyPieceDefs[pieceName].move]
}

//Return an array of squares that look like [xMoveValue, yMoveValue]
export const getAllEnemyCapSquaresRelative = function getAllEnemyCapSquaresRelative(pieceName) {
  //Make a deep clone of the nested object so subsequent operations don't mutate the original
  let enemyPiece = JSON.parse(JSON.stringify(enemyPieceDefs[pieceName]))
  return enemyPiece.cap
}

//Return the square the enemy should capture at, or if it shouldn't, undefined
export const getEnemyCapSquare = function getEnemyCapSquare(x, y, pieceState) {
  const piece = enemyPieceDefs[pieceState[x][y].name];
  let cappableSquares = piece.cap; //An array of coordinates relative to starting square

  //Turn the array into a shorter array of static square coordinates
  cappableSquares = cappableSquares.reduce((acc, square) => {
    let newX = x + square[0];
    let newY = y + square[1];
    //Only include the square if it is on the board, and contains a player piece
    if (newX >= 0 && newX < MAX_MOVE && newY >= 0 && newY < MAX_MOVE && pieceState[newX][newY] && pieceState[newX][newY].enemy === false) {
      return acc.concat([
        [newX, newY]
      ])
    } else {
      return acc;
    }
  }, [])
  if (!cappableSquares.length) {
    return;
  }

  //Divide the valid squares based on the rarity of player piece on them
  let rareSquares = cappableSquares.filter((square) => {
    return pieceState[square[0]][square[1]] && pieceDefs[pieceState[square[0]][square[1]].name].rarity === 3;
  })
  let uncommonSquares = cappableSquares.filter((square) => {
    return pieceState[square[0]][square[1]] && pieceDefs[pieceState[square[0]][square[1]].name].rarity === 2;
  })
  let commonSquares = cappableSquares.filter((square) => {
    return pieceState[square[0]][square[1]] && pieceDefs[pieceState[square[0]][square[1]].name].rarity === 1;
  })

  //Enemy AI should prioritze player pieces of higher rarity to take
  if (rareSquares.length) {
    return rareSquares[Math.floor(Math.random() * rareSquares.length)];
  } else if (uncommonSquares.length) {
    return uncommonSquares[Math.floor(Math.random() * uncommonSquares.length)];
  } else if (commonSquares.length) {
    return commonSquares[Math.floor(Math.random() * commonSquares.length)];
  } else {
    return
  }
}

//Return an array of all squares this enemy can capture at, at static coordinates
export const getAllEnemyCapSquares = function getAllEnemyCapSquares(x, y, pieceState) {
  const piece = enemyPieceDefs[pieceState[x][y].name];
  let cappableSquares = piece.cap;
  let result = cappableSquares.reduce((acc, square) => {
    let newX = x + square[0];
    let newY = y + square[1];
    //Disregard whether a player piece is on the square--this method is for highlighting
    if (newX >= 0 && newX < MAX_MOVE && newY >= 0 && newY < MAX_MOVE) {
      return acc.concat([
        [newX, newY]
      ])
    } else {
      return acc;
    }
  }, [])
  return result;
}

//Pass in the board's pieceState, and return a new pieceState that has
//been populated with enemy-representative objects for the game's start. 
export const randomizeEnemies = function randomizeEnemies(pieceState, difficulty) {

  //Each index corresponds to a column of the board: there will be one enemy on each column
  for (let i = 0; i < MAX_MOVE; i++) {
    //Each piece will be either 0, 1, or 2 spaces away from the opposite side of the board
    let y = Math.floor(Math.random() * 3);
    //Twelve discrete values, representing how many of the twelve pieces should be that rarity
    let rarityWeighted = Math.floor(Math.random() * 12);
    let rarity; //The rarity to fetch: 1, 2, or 3
    //Each round, difficulty gets higher, so each round, there is a smaller range that can be rarity-1 pieces
    //To begin: 8 out of 12 pieces on average should be rarity 1
    if (rarityWeighted <= 7 - difficulty) {
      rarity = 1;
    }
    //To begin: 3 out of 12 pieces on average should be rarity 2
    else if (rarityWeighted <= 10 - difficulty) {
      rarity = 2;
    }
    //To begin: 1 out of twelve pieces (at value 11) should be rarity 3
    else {
      rarity = 3;
    }
    let enemyNames = Object.keys(enemyPieceDefs);
    let enemyName = enemyNames[Math.floor(enemyNames.length * Math.random())];
    while (enemyPieceDefs[enemyName].rarity !== rarity) {
      enemyName = enemyNames[Math.floor(enemyNames.length * Math.random())];
    }
    pieceState[i] = {
      ...pieceState[i],
      [y]: {
        name: enemyName,
        enemy: true,
        exhausted: false
      }
    }
  }
  return pieceState;
}

//Return an array of static square coordinates that the piece at x and y can move to
export const getMoveableSquares = function getMoveableSquares(x, y, pieceName, pieceState) {
  let moveableSquares = []; //The return value, to be populated
  let moveTypes = [];
  let moveNoCapTypes = [];
  let capNoMoveTypes = [];
  let piece = pieceDefs[pieceName];
  //For each component, collect the move-square-collection algorithms into the above arrays 
  // based on their capability (move and capture, just move, or just capture)
  if (piece.components) {
    let components = piece.components;
    components.forEach((component) => {
      let componentObject = pieceDefs[component];
      moveTypes = moveTypes.concat(componentObject["move"] || []);
      moveNoCapTypes = moveNoCapTypes.concat(componentObject["moveNoCap"] || []);
      capNoMoveTypes = capNoMoveTypes.concat(componentObject["capNoMove"] || []);

      //For each component that has its own components, recurse as deep as necessary,
      //eventually adding return arrays of component pieces to the single parent array
      if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
        moveableSquares = moveableSquares.concat(getMoveableSquares(x, y, component, pieceState));
      }
    })
  }

  //Front components are like components, but their squares are only kept if they are ahead of the piece,
  //More technically, their y value is lower (because 0, 0 is the top left square)
  if (piece.frontComponents) {
    let components = piece.frontComponents;
    let tempMoveableSquares = []
    components.forEach((component) => {
      let componentObject = pieceDefs[component];

      //Move algorithms are collected
      let tempMoveTypes = componentObject["move"] || [];
      let tempMoveNoCapTypes = componentObject["moveNoCap"] || [];
      let tempCapNoMoveTypes = componentObject["capNoMove"] || [];

      //Collected algorithms are called.
      //Move type algorithms all have the same signature. They are called here with the last two arguments varying based
      //on the desired capability (move and cap, move, or cap) specficied in the component piece's definition.
      tempMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
      })
      tempMoveNoCapTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
      })
      tempCapNoMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
      })
      if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
        tempMoveableSquares = tempMoveableSquares.concat(getMoveableSquares(x, y, component, pieceState));
      }
    })
    //Filter out all the squares that are not "front", including those recursed from components of the component
    //And then add them to the results array.
    moveableSquares = moveableSquares.concat(tempMoveableSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }))
  }

  //Back components are like components, but their squares are only kept if they are behind of the piece,
  //More technically, their y value is higher (because 0, 0 is the top left square)
  if (piece.backComponents) {
    let components = piece.backComponents;
    let tempMoveableSquares = []
    components.forEach((component) => {
      let componentObject = pieceDefs[component];

      //Move algorithms are collected
      let tempMoveTypes = componentObject["move"] || [];
      let tempMoveNoCapTypes = componentObject["moveNoCap"] || [];
      let tempCapNoMoveTypes = componentObject["capNoMove"] || [];

      //Collected algorithms are called.
      //Move type algorithms all have the same signature. They are called here with the last two arguments varying based
      //on the desired capability (move and cap, move, or cap) specficied in the component piece's definition.
      tempMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
      })
      tempMoveNoCapTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
      })
      tempCapNoMoveTypes.forEach((moveType) => {
        tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
      })
      if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
        tempMoveableSquares = tempMoveableSquares.concat(getMoveableSquares(x, y, component, pieceState));
      }
    })

    //Filter out and all the squares that are not "front", including those recursed from components of the component
    //And then add them to the results array.
    moveableSquares = moveableSquares.concat(tempMoveableSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }))
  }

  //Move algorithms are collected for the main piece (we're done with components)
  moveTypes = moveTypes.concat(pieceDefs[pieceName]["move"] || []);
  moveNoCapTypes = moveNoCapTypes.concat(pieceDefs[pieceName]["moveNoCap"] || []);
  capNoMoveTypes = capNoMoveTypes.concat(pieceDefs[pieceName]["capNoMove"] || []);

  //Collected algorithms are called.
  //Move type algorithms all have the same signature. They are called here with the last two arguments varying based
  //on the desired capability (move and cap, move, or cap) specficied in the component piece's definition.
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

//Returns four distinct arrays of moveable squares for different move capabilities (sliding move, leaping move,
//move but no capture, capture but no move), so they can be displayed in different colors on the modal helper board.
//This method is also different than the above one in that it must fake an empty board.
export const getSquareHighlights = function getSquareHighlights(x, y, pieceName, piecesEmpty, piecesFull) {
  //The four arrays that will be returned
  let moveSquares = [];
  let leapSquares = [];
  let moveNoCapSquares = [];
  let capNoMoveSquares = [];

  let moveTypes = [];
  let moveNoCapTypes = [];
  let capNoMoveTypes = [];

  let piece = pieceDefs[pieceName];

  //Similar to the analogous stage in getMoveableSquares. Collect move algorithms for each component.
  if (piece.components) {
    let components = piece.components;

    components.forEach((component) => {
      let componentObject = pieceDefs[component];

      moveTypes = moveTypes.concat(componentObject["move"] || []);
      moveNoCapTypes = moveNoCapTypes.concat(componentObject["moveNoCap"] || []);
      capNoMoveTypes = capNoMoveTypes.concat(componentObject["capNoMove"] || []);

      //Different from getMoveableSquares: dummy piece states must be passed in, and there are four result arrays to handle
      if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
        let [tempMoveSquares, tempLeapSquares, tempMoveNoCapSquares, tempCapNoMoveSquares] = getSquareHighlights(x, y, component, piecesEmpty, piecesFull);
        moveSquares = moveSquares.concat(tempMoveSquares);
        leapSquares = leapSquares.concat(tempLeapSquares);
        moveNoCapSquares = moveNoCapSquares.concat(tempMoveNoCapSquares);
        capNoMoveSquares = capNoMoveSquares.concat(tempCapNoMoveSquares);
      }
    })
  }

  //Similar to the analogous stage in getMoveableSquares. Collect move squares for each front component.
  if (piece.frontComponents) {
    let components = piece.frontComponents;

    let tempMoveSquares = [];
    let tempLeapSquares = [];
    let tempMoveNoCapSquares = [];
    let tempCapNoMoveSquares = [];

    components.forEach((component) => {
      let componentObject = pieceDefs[component];

      //Collect move algorithms
      let tempMoveTypes = componentObject["move"] || [];
      let tempMoveNoCapTypes = componentObject["moveNoCap"] || [];
      let tempCapNoMoveTypes = componentObject["capNoMove"] || [];

      //Collected algorithms are called
      tempMoveTypes.forEach((moveType) => {
        //Leaping is represented in a different color, so move types counted as leaps must be checked for
        if (moveType[0] === "leap" || moveType[0] === 'preciseLeap') {
          tempLeapSquares = tempLeapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
        } else {
          tempMoveSquares = tempMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
        }
      })

      //When no capturing is allowed, pass in an empty-board dummy piece state to the move alg
      tempMoveNoCapTypes.forEach((moveType) => {
        tempMoveNoCapSquares = tempMoveNoCapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], true, false))
      })

      //When only capturing is allowed, pass in a full-board dummy piece state to the move alg
      tempCapNoMoveTypes.forEach((moveType) => {
        tempCapNoMoveSquares = tempCapNoMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesFull, true, false, true))
      })

      //Add results to their respective arrays. Can only touch temp arrays, not the final result arrays, because we still
      //need to check that the squares are only in the front of the piece before final merging.
      if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
        let [veryTempMoveSquares, veryTempLeapSquares, veryTempMoveNoCapSquares, veryTempCapNoMoveSquares] = getSquareHighlights(x, y, component, piecesEmpty, piecesFull);
        tempMoveSquares = tempMoveSquares.concat(veryTempMoveSquares);
        tempLeapSquares = tempLeapSquares.concat(veryTempLeapSquares);
        tempMoveNoCapSquares = tempMoveNoCapSquares.concat(veryTempMoveNoCapSquares);
        tempCapNoMoveSquares = tempCapNoMoveSquares.concat(veryTempCapNoMoveSquares);
      }
    })

    //Final merging into result arrays
    moveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }));
    leapSquares = leapSquares.concat(tempLeapSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }))
    moveNoCapSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }));
    capNoMoveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }));
  }

  //Similar to the analogous stage in getMoveableSquares. Collect move squares for each back component.
  if (piece.backComponents) {
    let components = piece.backComponents;
    let tempMoveSquares = [];
    let tempLeapSquares = [];
    let tempMoveNoCapSquares = [];
    let tempCapNoMoveSquares = [];
    components.forEach((component) => {
      let componentObject = pieceDefs[component];

      //Collect move algorithms
      let tempMoveTypes = componentObject["move"] || [];
      let tempMoveNoCapTypes = componentObject["moveNoCap"] || [];
      let tempCapNoMoveTypes = componentObject["capNoMove"] || [];

      //Collected algorithms are called
      tempMoveTypes.forEach((moveType) => {
        //Leaping is represented in a different color, so move types counted as leaps must be checked for
        if (moveType[0] === "leap" || moveType[0] === 'preciseLeap') {
          tempLeapSquares = tempLeapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
        } else {
          tempMoveSquares = tempMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
        }
      })

      //When no capturing is allowed, pass in an empty-board dummy piece state to the move alg
      tempMoveNoCapTypes.forEach((moveType) => {
        tempMoveNoCapSquares = tempMoveNoCapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], true, false))
      })

      //When only capturing is allowed, pass in a full-board dummy piece state to the move alg
      tempCapNoMoveTypes.forEach((moveType) => {
        tempCapNoMoveSquares = tempCapNoMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesFull, true, false, true))
      })

      //Add results to their respective arrays. Can only touch temp arrays, not the final result arrays, because we still
      //need to check that the squares are only in the back of the piece before final merging.
      if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
        let [veryTempMoveSquares, veryTempLeapSquares, veryTempMoveNoCapSquares, veryTempCapNoMoveSquares] = getSquareHighlights(x, y, component, piecesEmpty, piecesFull);
        tempMoveSquares = tempMoveSquares.concat(veryTempMoveSquares);
        tempLeapSquares = tempLeapSquares.concat(veryTempLeapSquares);
        tempMoveNoCapSquares = tempMoveNoCapSquares.concat(veryTempMoveNoCapSquares);
        tempCapNoMoveSquares = tempCapNoMoveSquares.concat(veryTempCapNoMoveSquares);
      }
    })

    //Final merging into result arrays
    moveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }));
    leapSquares = leapSquares.concat(tempLeapSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }))
    moveNoCapSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }));
    capNoMoveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }));
  }

  //Collect algorithms once more, for original parent piece
  moveTypes = moveTypes.concat(pieceDefs[pieceName]["move"] || []);
  moveNoCapTypes = moveNoCapTypes.concat(pieceDefs[pieceName]["moveNoCap"] || []);
  capNoMoveTypes = capNoMoveTypes.concat(pieceDefs[pieceName]["capNoMove"] || []);

  //Call algorithms once more, and merge results into parent arrays
  moveTypes.forEach((moveType) => {
    if (moveType[0] === "leap" || moveType[0] === 'preciseLeap') {
      leapSquares = leapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
    } else {
      moveSquares = moveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
    }
  })

  moveNoCapTypes.forEach((moveType) => {
    moveNoCapSquares = moveNoCapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], true, false))
  })

  capNoMoveTypes.forEach((moveType) => {
    capNoMoveSquares = capNoMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesFull, true, false, true))
  })

  return [moveSquares, leapSquares, moveNoCapSquares, capNoMoveSquares];
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
    const helper = function helper(x, y, delta1, delta2, pieceState) {
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
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, negDelta2, pieceState));
    } else if (posDelta1 === 0) {
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta2, posDelta1, pieceState));
    } else if (posDelta2 === 0) {
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, negDelta1, pieceState));
    } else {
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, posDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta1, negDelta2, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta2, posDelta1, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, negDelta2, negDelta1, pieceState));
      moveableSquares = moveableSquares.concat(helper(x, y, posDelta2, negDelta1, pieceState));
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

export const enemyPieceDefs = {
  shroom: {
    move: 1,
    cap: [
      [1, 1],
      [-1, 1]
    ],
    rarity: 1
  },
  dandy: {
    move: 1,
    cap: [
      [1, 2],
      [-1, 2]
    ],
    rarity: 1
  },
  thistle: {
    move: 1,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ],
    rarity: 2
  },
  sunflower: {
    move: 2,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ],
    rarity: 2
  },
  fungi: {
    move: 2,
    cap: [
      [1, 1],
      [-1, 1],
      [0, 1],
    ],
    rarity: 2
  },
  willow: {
    move: 2,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [2, 2],
      [2, -2],
      [-2, 2],
      [-2, -2]
    ],
    rarity: 3

  },
  forestmother: {
    move: 3,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ],
    rarity: 3
  }
}

export const pieceDefs = {
  // dummy: {
  //   rarity: 1
  // },
  pawn: {
    moveNoCap: [
      ["N", 1]
    ],
    capNoMove: [
      ["NE", 1],
      ["NW", 1]
    ],
    rarity: 1
  },
  berolina: {
    moveNoCap: [
      ["NE", 1],
      ["NW", 1]
    ],
    capNoMove: [
      ["N", 1]
    ],
    rarity: 1
  },
  dwarf: {
    components: ["pawn"],
    moveNoCap: [
      ["E", 1],
      ["W", 1]
    ],
    rarity: 1
  },
  fish: {
    components: ['dwarf'],
    moveNoCap: [
      ['S', 1]
    ],
    capNoMove: [
      ['SW', 1],
      ['SE', 1]
    ],
    rarity: 1
  },
  wazir: {
    move: [
      ["N", 1],
      ["E", 1],
      ["S", 1],
      ["W", 1],
    ],
    rarity: 1
  },
  donkey: {
    components: ['wazir'],
    move: [
      ["N", 2],
      ["S", 2]
    ],
    rarity: 1
  },
  trebuchet: {
    move: [
      ["leap", [3, 0]]
    ],
    rarity: 1
  },
  plus: {
    components: ['berolina'],
    capNoMove: [
      ['E', 1],
      ['W', 1]
    ],
    rarity: 1
  },
  mantis: {
    backComponents: ['alfil'],
    moveNoCap: [
      ['N', 1],
      ['S', 1]
    ],
    capNoMove: [
      ['NE', 3]
    ],
    rarity: 1
  },
  silver: {
    components: ['ferz'],
    move: [
      ['N', 1]
    ],
    rarity: 1
  },
  golden: {
    components: ['centurion'],
    move: [
      ['E', 1],
      ['W', 1]
    ],
    rarity: 1
  },
  dababba: {
    move: [
      ['leap', [2, 0]]
    ],
    rarity: 1
  },
  goose: {
    backComponents: ['dababba'],
    frontComponents: ['alfil'],
    rarity: 1
  },
  narrow: {
    move: [
      ['preciseLeap', [
        [1, 2],
        [1, -2],
        [-1, -2],
        [-1, 2]
      ]]
    ],
    rarity: 1
  },
  hobbit: {
    moveNoCap: [
      ['N', 2],
      ['E', 2],
      ['S', 2],
      ['W', 2],
    ],
    capNoMove: [
      ['NE', 1],
      ['SE', 1],
      ['SW', 1],
      ['NW', 1],
    ],
    rarity: 1
  },
  goat: {
    moveNoCap: [
      ['NE', 1],
      ['SE', 1],
      ['SW', 1],
      ['NW', 1],
    ],
    capNoMove: [
      ['N', 2],
      ['E', 2],
      ['S', 2],
      ['W', 2],
    ],
    rarity: 1
  },
  drunk: {
    moveNoCap: [
      ['NE', 1],
      ['SE', 1],
      ['SW', 1],
      ['NW', 1],
      ['E', 1],
      ['W', 1],
      ['S', 1]
    ],
    capNoMove: [
      ['N', 1]
    ],
    rarity: 1
  },
  ferz: {
    move: [
      ["NE", 1],
      ["SE", 1],
      ["SW", 1],
      ["NW", 1],
    ],
    rarity: 1
  },
  pikeman: {
    move: [
      ['NW', 1],
      ['W', 1],
      ['SE', 1],
      ['E', 1]
    ],
    rarity: 1
  },
  woodenman: {
    move: [
      ['NW', 3],
      ['NE', 3]
    ],
    rarity: 1
  },
  centurion: {
    move: [
      ["NW", 1],
      ["N", 1],
      ["NE", 1],
    ],
    rarity: 1
  },
  stork: {
    components: ['alfil'],
    capNoMove: [
      ['N', 1],
      ['E', 1],
      ['S', 1],
      ['W', 1],
    ],
    rarity: 1
  },
  tripper: {
    move: [
      ['leap', [3, 3]]
    ],
    rarity: 1
  },
  arrowpawn: {
    moveNoCap: [
      ['N', MAX_MOVE]
    ],
    capNoMove: [
      ['NE', MAX_MOVE],
      ['NW', MAX_MOVE]
    ],
    rarity: 1
  },
  bird: {
    frontComponents: ['king', 'alfil', 'dababba'],
    move: [
      ['E', 1],
      ['W', 1]
    ],
    rarity: 1
  },
  alfil: {
    move: [
      ['leap', [2, 2]]
    ],
    rarity: 1
  },
  flamingo: {
    move: [
      ['leap', [1, 6]]
    ],
    rarity: 1
  },
  wisp: {
    frontComponents: ['dababba'],
    backComponents: ['alfil'],
    move: [
      ['preciseLeap', [
        [-2, 0],
        [2, 0]
      ]]
    ],
    rarity: 1,
  },
  elemental: {
    components: ['plus', 'dababba'],
    moveNoCap: [
      ['SE', 1],
      ['SW', 1]
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
  threerider: {
    move: [
      ['repeatingLeap', [3, 0]]
    ],
    rarity: 1
  },
  willowisp: {
    frontComponents: ['machine'],
    backComponents: ['elephant'],
    move: [
      ['E', 2],
      ['W', 2]
    ],
    rarity: 1
  },
  king: {
    move: [
      ["N", 1],
      ["E", 1],
      ["S", 1],
      ["W", 1],
      ["NE", 1],
      ["SE", 1],
      ["SW", 1],
      ["NW", 1],
    ],
    rarity: 1
  },
  tadpole: {
    components: ['ferz', 'trebuchet'],
    capNoMove: [
      ['N', 1],
      ['S', 1],
      ['E', 1],
      ['W', 1],
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
  napoleon: {
    components: ['ferz', 'narrow'],
    rarity: 2
  },
  knave: {
    move: [
      ['preciseLeap', [
        [0, 2],
        [0, -2],
        [2, 1],
        [-2, 1],
        [-2, -1],
        [2, -1]
      ]]
    ],
    rarity: 2
  },
  bull: {
    move: [
      ['leap', [3, 4]]
    ],
    rarity: 2
  },
  skiprook: {
    move: [
      ['repeatingLeap', [2, 0]]
    ],
    rarity: 2
  },
  duck: {
    components: ['ferz', 'skiprook'],
    rarity: 2
  },
  camel: {
    move: [
      ['leap', [3, 1]]
    ],
    rarity: 2
  },
  // raindrop: {
  //   frontComponents: ['knight'],
  //   backComponents: ['leftdog'],
  //   rarity: 2
  // },
  spectre: {
    moveNoCap: [
      ['N', MAX_MOVE],
      ['E', MAX_MOVE],
      ['S', MAX_MOVE],
      ['W', MAX_MOVE]
    ],
    capNoMove: [
      ['NE', 1],
      ['SE', 1],
      ['SW', 1],
      ['NW', 1],
    ],
    rarity: 2
  },
  warlord: {
    moveNoCap: [
      ['NE', MAX_MOVE],
      ['SE', MAX_MOVE],
      ['SW', MAX_MOVE],
      ['NW', MAX_MOVE]
    ],
    capNoMove: [
      ['N', 1],
      ['E', 1],
      ['S', 1],
      ['W', 1],
    ],
    rarity: 2
  },
  carpenter: {
    moveNoCap: [
      ['leap', [2, 0]]
    ],
    capNoMove: [
      ['leap', [2, 1]]
    ],
    rarity: 2
  },
  gnomon: {
    components: ['threerider', 'narrow'],
    move: [
      ['preciseLeap',
        [0, -1],
        [0, 1],
      ]
    ],
    rarity: 2
  },
  schemer: {
    frontComponents: ['king'],
    backComponents: ['ship'],
    move: [
      ['E', 1],
      ['W', 1]
    ],
    rarity: 2
  },
  hunter: {
    frontComponents: ["rook"],
    backComponents: ["bishop"],
    rarity: 2
  },
  falcon: {
    frontComponents: ["bishop"],
    backComponents: ["rook"],
    rarity: 2
  },
  charger: {
    frontComponents: ['knight'],
    backComponents: ['king'],
    move: [
      ["E", 1],
      ["W", 1]
    ],
    rarity: 2
  },
  deer: {
    frontComponents: ['bishop'],
    backComponents: ['elephant'],
    rarity: 2
  },
  sword: {
    components: ["wazir"],
    move: [
      ['N', MAX_MOVE],
      ['S', MAX_MOVE]
    ],
    rarity: 2
  },
  shield: {
    components: ['wazir'],
    move: [
      ['E', MAX_MOVE],
      ['W', MAX_MOVE],
    ],
    rarity: 2
  },
  rightdog: {
    move: [
      ['N', MAX_MOVE],
      ['SW', MAX_MOVE],
      ['S', 1],
      ['E', 1]
    ],
    rarity: 2
  },
  leftdog: {
    move: [
      ['N', MAX_MOVE],
      ['SE', MAX_MOVE],
      ['S', 1],
      ['W', 1]
    ],
    rarity: 2
  },
  monkey: {
    move: [
      ['E', MAX_MOVE],
      ['W', MAX_MOVE],
      ['SE', 2],
      ['NW', 2]
    ],
    rarity: 2
  },
  holyghost: {
    components: ['tripper', 'zebra'],
    move: [
      ['leap', [4, 2]]
    ],
    rarity: 2
  },
  shortrook: {
    move: [
      ['N', 4],
      ['E', 4],
      ['S', 4],
      ['W', 4],
    ],
    rarity: 2
  },
  skycat: {
    frontComponents: ['trebuchet', 'tripper'],
    backComponents: ['king'],
    move: [
      ['preciseLeap', [
        [3, 0],
        [-3, 0]
      ]]
    ],
    rarity: 2
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
  spy: {
    frontComponents: ['knight', 'machine'],
    move: [
      ['E', 2],
      ["W", 2]
    ],
    rarity: 2
  },
  sausage: {
    components: ['ferz', 'narrow'],
    move: [
      ['preciseLeap', [
        [0, 3],
        [0, -3]
      ]],
      ['E', 1],
      ['W', 1]
    ],
    rarity: 2
  },
  shroomer: {
    components: ['narrow'],
    backComponents: ['ferz'],
    move: [
      ['preciseLeap', [
        [3, -1],
        [-3, -1]
      ]]
    ],
    rarity: 2
  },
  sprite: {
    moveNoCap: [
      ['leap', [2, 1]]
    ],
    capNoMove: [
      ["NE", MAX_MOVE],
      ["SE", MAX_MOVE],
      ["SW", MAX_MOVE],
      ["NW", MAX_MOVE]
    ],
    rarity: 2
  },
  knight: {
    move: [
      ["leap", [2, 1]]
    ],
    rarity: 2
  },
  halfduck: {
    components: ['ferz', 'antelope'],
    rarity: 2
  },
  alibaba: {
    components: ["alfil", 'dababba'],
    rarity: 2
  },
  wyrm: {
    components: ['knight', 'pawn'],
    rarity: 2
  },
  bishop: {
    move: [
      ["NE", MAX_MOVE],
      ["SE", MAX_MOVE],
      ["SW", MAX_MOVE],
      ["NW", MAX_MOVE]
    ],
    rarity: 2
  },
  woodenbird: {
    components: ['machine'],
    move: [
      ["leapThenMove", [
        [3, 3],
        ["SE", MAX_MOVE]
      ]],
      ["leapThenMove", [
        [3, -3],
        ["NE", MAX_MOVE]
      ]],
      ["leapThenMove", [
        [-3, 3],
        ["SW", MAX_MOVE]
      ]],
      ["leapThenMove", [
        [-3, -3],
        ["NW", MAX_MOVE]
      ]],
    ],
    rarity: 2
  },
  pixie: {
    components: ['warlord'],
    capNoMove: [
      ['N', MAX_MOVE],
      ['E', MAX_MOVE],
      ['S', MAX_MOVE],
      ['W', MAX_MOVE],
    ],
    rarity: 2
  },
  crabinal: {
    frontComponents: ['narrow'],
    move: [
      ["NE", 5],
      ["SE", 5],
      ["SW", 5],
      ["NW", 5],
      ['preciseLeap', [
        [2, 1],
        [-2, 1]
      ]]
    ],
    rarity: 2
  },
  sylph: {
    capNoMove: [
      ['leap', [2, 1]]
    ],
    moveNoCap: [
      ["N", MAX_MOVE],
      ["E", MAX_MOVE],
      ["S", MAX_MOVE],
      ["W", MAX_MOVE]
    ],
    rarity: 2
  },
  congo: {
    components: ['alibaba'],
    moveNoCap: [
      ["N", 1],
      ["E", 1],
      ["S", 1],
      ["W", 1],
      ["NE", 1],
      ["SE", 1],
      ["SW", 1],
      ["NW", 1],
    ],
    rarity: 2
  },
  bongo: {
    components: ['alibaba'],
    capNoMove: [
      ["N", 1],
      ["E", 1],
      ["S", 1],
      ["W", 1],
      ["NE", 1],
      ["SE", 1],
      ["SW", 1],
      ["NW", 1],
    ],
    rarity: 2
  },
  deva: {
    components: ['ferz', 'alibaba'],
    rarity: 2
  },
  marquis: {
    components: ['knight', 'wazir'],
    rarity: 2
  },
  priest: {
    components: ['knight', 'ferz'],
    rarity: 2
  },
  camelopard: {
    move: [
      ['repeatingLeap', [3, 1]],
      ['repeatingLeap', [4, 0]]
    ],
    rarity: 2
  },
  nightrider: {
    move: [
      ['repeatingLeap', [2, 1]]
    ],
    rarity: 2
  },
  dayrider: {
    move: [
      ['repeatingLeap', [2, 0]],
      ['repeatingLeap', [2, 2]]
    ],
    rarity: 2
  },
  snapdragon: {
    components: ['shortrook'],
    move: [
      ['leap', [4, 2]]
    ],
    rarity: 2
  },
  rook: {
    move: [
      ["N", MAX_MOVE],
      ["E", MAX_MOVE],
      ["S", MAX_MOVE],
      ["W", MAX_MOVE]
    ],
    rarity: 2
  },
  redcap: {
    components: ['shield'],
    frontComponents: ['bishop'],
    rarity: 2
  },
  anticorn: {
    move: [
      ['leapThenMove', [
        [0, -6],
        ["S", 4]
      ]],
      ['leapThenMove', [
        [0, 6],
        ["N", 4]
      ]],
      ['leapThenMove', [
        [-6, 0],
        ["E", 4]
      ]],
      ['leapThenMove', [
        [6, 0],
        ["W", 4]
      ]],
      ['leapThenMove', [
        [6, -6],
        ["SW", 4]
      ]],
      ['leapThenMove', [
        [6, 6],
        ["NW", 4]
      ]],
      ['leapThenMove', [
        [-6, -6],
        ["SE", 4]
      ]],
      ['leapThenMove', [
        [-6, 6],
        ["NE", 4]
      ]],
    ],
    rarity: 2
  },
  macaw: {
    components: ['sprite', 'skiprook', 'plus'],
    rarity: 2
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
  guardian: {
    components: ['elephant', 'shortrook'],
    rarity: 2
  },
  blind: {
    components: ['king'],
    move: [
      ['N', MAX_MOVE]
    ],
    rarity: 2
  },
  pegasus: {
    components: ['narrow'],
    move: [
      ['N', MAX_MOVE]
    ],
    rarity: 2
  },
  doctor: {
    move: [
      ['repeatingLeap', [2, 2]],
      ['preciseLeap', [
        [2, 0],
        [3, 0],
        [4, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0]
      ]]
    ],
    rarity: 2
  },
  wizard: {
    components: ['ferz', 'camel'],
    rarity: 2
  },
  champion: {
    components: ['machine', 'alfil'],
    rarity: 2
  },
  gaja: {
    components: ['dababba', 'alfil', 'knight'],
    rarity: 2
  },
  wildebeest: {
    components: ['knight', 'camel'],
    rarity: 2
  },
  lion: {
    components: ['trebuchet', 'camel'],
    rarity: 2
  },
  pelican: {
    components: ['antelope', 'alfil', 'tripper'],
    rarity: 2
  },
  albatross: {
    components: ['sylph', 'camel'],
    rarity: 2
  },
  nurse: {
    frontComponents: ['centurion', 'alfil'],
    backComponents: ['rook'],
    move: [
      ['preciseLeap', [
        [2, 0],
        [4, 0],
        [6, 0],
        [8, 0],
        [-2, 0],
        [-4, 0],
        [-6, 0],
        [-8, 0]
      ]]
    ],
    rarity: 2
  },
  darter: {
    components: ['wazir'],
    frontComponents: ['knight'],
    backComponents: ['doctor'],
    rarity: 2
  },
  mountain: {
    components: ['bishop'],
    move: [
      ['N', 4],
      ['W', 4]
    ],
    rarity: 2
  },
  valley: {
    components: ['bishop'],
    move: [
      ['E', 4],
      ['S', 4]
    ],
    rarity: 2
  },
  centaur: {
    components: ['knight', 'king'],
    rarity: 2
  },
  reflector: {
    move: [
      ['reflect', 'NE'],
      ['reflect', 'SE'],
      ['reflect', 'SW'],
      ['reflect', 'NW'],
    ],
    rarity: 2
  },
  dove: {
    move: [
      ['NE', 5],
      ['NW', 5],
      ['E', 1],
      ['W', 1],
      ['S', 1]
    ],
    rarity: 2
  },
  hippogriff: {
    components: ['wazir'],
    move: [
      ['leapThenMove', [
        [1, 4],
        ["S", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -4],
        ["N", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 4],
        ["S", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -4],
        ["N", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [4, 1],
        ["E", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [4, -1],
        ["E", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-4, 1],
        ["W", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-4, -1],
        ["W", MAX_MOVE]
      ]],
    ],
    rarity: 2
  },
  peacock: {
    backComponents: ['elephant'],
    move: [
      ['leapThenMove', [
        [0, -1],
        ['NW', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [0, -1],
        ['NE', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 0],
        ['NW', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, 0],
        ['NE', MAX_MOVE]
      ]],
    ],
    rarity: 2
  },
  vulture: {
    components: ['pixie', 'king'],
    rarity: 2
  },
  whale: {
    components: ['hunter'],
    move: [
      ["S", MAX_MOVE]
    ],
    rarity: 2
  },
  // emperor: {
  //   components: ['hunter', 'elephant', 'knight'],
  //   rarity: 3

  // },
  // otter: {
  //   components: ['sword', 'shortrook'],
  //   rarity: 2
  // },
  scepter: {
    components: ['king', 'sword'],
    rarity: 2
  },
  turtlesnake: {
    components: ['king'],
    move: [
      ['NW', MAX_MOVE],
      ['SE', MAX_MOVE]
    ],
    rarity: 2
  },
  butcher: {
    frontComponents: ['centurion', 'alfil'],
    backComponents: ['bishop'],
    move: [
      ['preciseLeap', [
        [2, 0],
        [-2, 0]
      ]]
    ],
    rarity: 2,
  },
  firstwing: {
    components: ['king'],
    move: [
      ['NW', MAX_MOVE],
      ['SW', MAX_MOVE],
      ['preciseLeap', [
        [2, 1],
        [2, -1]
      ]]
    ],
    rarity: 2
  },
  secondwing: {
    move: [
      ['NE', MAX_MOVE],
      ['E', MAX_MOVE],
      ['SE', MAX_MOVE],
      ['preciseLeap', [
        [-2, 0],
        [-3, 0]
      ]]
    ],
    rarity: 2
  },
  vermillion: {
    move: [
      ['NE', MAX_MOVE],
      ['SW', MAX_MOVE],
      ['N', 3],
      ['S', 3],
    ],
    rarity: 2
  },
  whitehorse: {
    components: ['falcon'],
    move: [
      ['N', MAX_MOVE]
    ],
    rarity: 2
  },
  buffalo: {
    components: ['knight', 'camel', 'zebra'],
    rarity: 2
  },
  lynx: {
    components: ['elephant', 'knight'],
    rarity: 2
  },
  fortress: {
    components: ['bishop', 'dababba'],
    rarity: 2
  },
  pasha: {
    components: ['elephant', 'machine'],
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
    rarity: 2
  },
  bowman: {
    components: ['woodenman'],
    move: [
      ['N', MAX_MOVE],
      ['E', 2],
      ['W', 2],
      ['S', 1]
    ],
    rarity: 2
  },
  dreameater: {
    components: ['nurse'],
    frontComponents: ['rook', 'doctor'],
    backComponents: ['rook'],
    rarity: 2
  },
  raindragon: {
    components: ['nurse'],
    frontComponents: ['narrow'],
    backComponents: ['bishop'],
    rarity: 3
  },
  clouddragon: {
    components: ['bishop', 'king'],
    move: [
      ['S', MAX_MOVE]
    ],
    rarity: 3
  },
  winddragon: {
    components: ['secondwing'],
    move: [
      ['W', MAX_MOVE],
      ['NW', MAX_MOVE],
      ['SW', 1]
    ],
    rarity: 3
  },
  earthdragon: {
    components: ['dababba'],
    backComponents: ["bishop"],
    frontComponents: ['king', 'alfil'],
    move: [
      ['preciseLeap', [
        [2, -1],
        [-2, -1],
        [3, -1],
        [-3, -1]
      ]]
    ],
    rarity: 3
  },
  duchess: {
    components: ['skiprook', 'bishop'],
    rarity: 3
  },
  goldenbird: {
    components: ['machine', 'woodenman'],
    frontComponents: ['rook'],
    backComponents: ['rook'],
    move: [
      ['SE', MAX_MOVE],
      ['SW', MAX_MOVE]
    ],
    rarity: 3
  },
  demon: {
    components: ['shortrook'],
    frontComponents: ['bishop'],
    move: [
      ['E', MAX_MOVE],
      ['W', MAX_MOVE]
    ],
    rarity: 3
  },
  stag: {
    components: ['rook'],
    frontComponents: ['narrow'],
    backComponents: ['elephant'],
    rarity: 3
  },
  starrider: {
    components: ['knight'],
    move: [
      ['repeatingLeap', [3, 1]],
      ['leap', [3, 4]]
    ],
    rarity: 3
  },
  shedevil: {
    backComponents: ['queen'],
    frontComponents: ['wazir'],
    move: [
      ['E', MAX_MOVE],
      ['W', MAX_MOVE]
    ],
    rarity: 3
  },
  squirrel: {
    move: [
      ["N", 3],
      ["E", 3],
      ["S", 3],
      ["W", 3],
      ["NE", 3],
      ["SE", 3],
      ["SW", 3],
      ["NW", 3],
    ],
    rarity: 3
  },
  kangaroo: {
    move: [
      ['leapThenMove', [
        [0, -3],
        ["N", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [0, 3],
        ["S", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, 0],
        ["W", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, 0],
        ["E", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, -3],
        ["NE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, 3],
        ["SE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, -3],
        ["NW", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, 3],
        ["SW", MAX_MOVE]
      ]],
    ],
    rarity: 3
  },
  elderwyrm: {
    components: ['tripper', 'trebuchet'],
    moveNoCap: [
      ['leapThenMove', [
        [0, -4],
        ["N", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [0, 4],
        ["S", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-4, 0],
        ["W", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [4, 0],
        ["E", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [4, -4],
        ["NE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [4, 4],
        ["SE", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-4, -4],
        ["NW", MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-4, 4],
        ["SW", MAX_MOVE]
      ]],
    ],
    capNoMove: [
      ["N", 3],
      ["E", 3],
      ["S", 3],
      ["W", 3],
      ["NE", 3],
      ["SE", 3],
      ["SW", 3],
      ["NW", 3],
    ],
    rarity: 3
  },
  spiritbird: {
    components: ['shortrook'],
    frontComponents: ['rook'],
    backComponents: ['rook'],
    move: [
      ['SW', 4],
      ['SE', 4],
      ['leapThenMove', [
        [4, -4],
        ['NE', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-4, -4],
        ['NW', MAX_MOVE]
      ]],
    ],
    rarity: 3,
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
  colonel: {
    frontComponents: ['rook', 'knight'],
    backComponents: ['king'],
    move: [
      ['E', MAX_MOVE],
      ["W", MAX_MOVE]
    ],
    rarity: 3
  },
  wolf: {
    move: [
      ['leapThenMove', [
        [0, 2],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [0, -2],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, 0],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, 0],
        ['W', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, 2],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, 2],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, -2],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [2, -2],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, 2],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, 2],
        ['W', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, -2],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-2, -2],
        ['W', MAX_MOVE]
      ]],
    ],
    rarity: 3
  },
  zurafa: {
    move: [
      ['leapThenMove', [
        [1, 3],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, 3],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, 1],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, 1],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -3],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [1, -3],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, -1],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [3, -1],
        ['E', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -3],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, -3],
        ['W', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, -1],
        ['N', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, -1],
        ['W', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 3],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-1, 3],
        ['W', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, 1],
        ['S', MAX_MOVE]
      ]],
      ['leapThenMove', [
        [-3, 1],
        ['W', MAX_MOVE]
      ]],
    ],
    rarity: 3
  },
  witch: {
    components: ['nightrider'],
    move: [
      ['repeatingLeap', [3, 1]],
      ['repeatingLeap', [3, 2]]
    ],
    rarity: 3,
  },
  warlock: {
    components: ['knight', 'camel', 'zebra'],
    move: [
      ['leap', [1, 4]],
      ['leap', [2, 4]],
      ['leap', [1, 5]]
    ],
    rarity: 3
  },
  snowcat: {
    components: ['rook', 'knight', 'zebra'],
    rarity: 3
  },
  master: {
    components: ['knight', 'ferz', 'wazir', 'alfil', 'tripper'],
    rarity: 3
  },
  spider: {
    components: ['elephant', 'dababba', 'knight'],
    rarity: 3
  },
  dragon: {
    components: ['king', 'gaja'],
    rarity: 3
  },
  caliph: {
    components: ['bishop', 'camel'],
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
    components: ['bishop', 'shield'],
    rarity: 3
  },
  ox: {
    components: ['bishop', 'sword'],
    rarity: 3
  },
  glatisant: {
    components: ['boar'],
    move: [
      ['S', MAX_MOVE],
    ],
    rarity: 3
  },
  canvasser: {
    components: ['rook', 'camel'],
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
    ],
    rarity: 3
  },
  queen: {
    components: ['bishop', 'rook'],
    rarity: 3
  },
  banshee: {
    components: ['bishop', 'nightrider'],
    rarity: 3
  },
  raven: {
    components: ['rook', 'nightrider'],
    rarity: 3
  },
  // icedragon: {
  //   components: ['queen', 'camel'],
  //   rarity: 3,
  // },
  amazon: {
    components: ['knight', 'rook', 'bishop'],
    rarity: 3
  },
  nightqueen: {
    components: ['queen', 'nightrider'],
    rarity: 3
  },
  kraken: {
    components: ['king'],
    moveNoCap: [
      ['all']
    ],
    rarity: 3,
  },
  bugeye: {
    move: [
      ['bugeye']
    ],
    rarity: 3
  }
}