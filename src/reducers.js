import {
  getMoveableSquares,
  getEnemyMoveSquare,
  getEnemyCapSquare,
  getAllEnemyCapSquares,
} from './pieceData';

export const reducer = function reducer(state, action) {
  let stateClone = JSON.parse(JSON.stringify(state));
  let newPieces = stateClone.pieces;
  let newSquares = stateClone.squares;
  switch (action.type) {
    case 'move':
      const oldX = action.xOrg;
      const oldY = action.yOrg;
      const newX = action.xDest;
      const newY = action.yDest;
      if (oldX === newX && oldY === newY) {
        return state;
      }

      newPieces = {
        ...newPieces,
        [oldX]: {
          ...newPieces[oldX],
          [oldY]: null,
        },
      };
      newPieces = {
        ...newPieces,
        [newX]: {
          ...newPieces[newX],
          [newY]: {
            ...action.piece,
            exhausted: true
          },
        },
      };
      return {
        ...stateClone, pieces: newPieces
      };
    case 'setup':
      newPieces = {
        ...newPieces,
        3: {
          ...newPieces[3],
          1: {
            name: 'shroom',
            enemy: true,
            exhausted: false
          },
          9: action.piece1,
        },
        4: {
          ...newPieces[4],
          1: {
            name: 'shroom',
            enemy: true,
            exhausted: false
          },
          9: action.piece2,
        },
        5: {
          ...newPieces[5],
          1: {
            name: 'dandy',
            enemy: true,
            exhausted: false
          },
          9: action.piece3,
        },
        6: {
          ...newPieces[6],
          1: {
            name: 'dandy',
            enemy: true,
            exhausted: false
          },
          9: action.piece4,
        },
        7: {
          ...newPieces[7],
          1: {
            name: 'shroom',
            enemy: true,
            exhausted: false
          },
          9: action.piece5,
        },
        8: {
          ...newPieces[8],
          1: {
            name: 'shroom',
            enemy: true,
            exhausted: false
          },
          9: action.piece6,
        },
      };
      const baseSquaresClone = JSON.parse(JSON.stringify(newSquares));
      const currentPiecesClone = JSON.parse(JSON.stringify(newPieces));
      return {
        ...stateClone, pieces: newPieces, baseSquares: baseSquaresClone, lastTurnPieceState: currentPiecesClone, inProgress: true,
      };
    case 'endturn':
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          if (state.pieces[x][y] && state.pieces[x][y].enemy === true) {
            let capSquare = getEnemyCapSquare(x, y, newPieces);
            if (capSquare) {
              newPieces = {
                ...newPieces,
                [x]: {
                  ...newPieces[x],
                  [y]: null,
                },
              };
              newPieces = {
                ...newPieces,
                [capSquare[0]]: {
                  ...newPieces[capSquare[0]],
                  [capSquare[1]]: state.pieces[x][y],
                },
              };
            } else {
              let newSquare = getEnemyMoveSquare(x, y, newPieces);
              if (newSquare) {
                newPieces = {
                  ...newPieces,
                  [x]: {
                    ...newPieces[x],
                    [y]: null,
                  },
                };
                newPieces = {
                  ...newPieces,
                  [newSquare[0]]: {
                    ...newPieces[newSquare[0]],
                    [newSquare[1]]: state.pieces[x][y],
                  },
                };
              }
            }
          } else if (newPieces[x][y] && newPieces[x][y].enemy === false) {
            newPieces[x][y].exhausted = false;
          }
        }
      }
      const currentPiecesRecord = JSON.parse(JSON.stringify(newPieces));

      return {
        ...stateClone, pieces: newPieces, lastTurnPieceState: currentPiecesRecord
      };
    case 'highlight':
      const moveableSquares = getMoveableSquares(
        action.x,
        action.y,
        action.pieceName,
        newPieces
      );
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          newSquares[x][y] = {
            ...newSquares[x][y],
            canDrop: 'no'
          };
        }
      }
      for (const square of moveableSquares) {
        newSquares[square[0]][square[1]] = {
          ...newSquares[square[0]][square[1]],
          canDrop: 'yes',
        };
      }
      return {
        ...stateClone, squares: newSquares
      };
    case 'enemyhighlight':
      const moveableSquare = getEnemyMoveSquare(
        action.x,
        action.y,
        newPieces
      );
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          newSquares[x][y] = {
            ...newSquares[x][y],
            canDrop: 'no'
          };
        }
      }
      if (moveableSquare) {
        newSquares[moveableSquare[0]][moveableSquare[1]] = {
          ...newSquares[moveableSquare[0]][moveableSquare[1]],
          canDrop: 'yes',
        };
      }
      return {
        ...stateClone, squares: newSquares
      };
    case 'enemyCaptureOn':
      let squares = [];
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          if (newPieces[x][y] && newPieces[x][y].enemy === true) {
            squares = squares.concat(getAllEnemyCapSquares(x, y, newPieces));
          }
          newSquares[x][y].xMark = false;
        }
      }
      squares.forEach((square) => {
        newSquares[square[0]][square[1]].xMark = true;
      })

      return {
        ...stateClone,
        squares: newSquares,
          enemyCaptureShown: true,
      };
    case 'enemyCaptureOff':
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          newSquares[x][y].xMark = false;
        }
      }
      return {
        ...stateClone,
        squares: newSquares,
          enemyCaptureShown: false,
      };
    case 'dehighlight':
      return {
        ...stateClone, squares: stateClone.baseSquares
      };
    case 'resetTurn':
      if (!stateClone.lastTurnPieceState) {
        return state;
      }
      newPieces = JSON.parse(JSON.stringify(stateClone.lastTurnPieceState));
      return {
        ...stateClone, pieces: newPieces
      };
    default:
      throw new Error('No reducer for action type');
  }
}