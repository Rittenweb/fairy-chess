import {
  getMoveableSquares,
  getEnemyMoveSquare,
  getEnemyCapSquare,
  getAllEnemyCapSquares,
  randomizeEnemies,
  getPieceWithRarity

} from './pieceData';
import {
  initialState
} from './baseStates'

export const reducer = function reducer(state, action) {
  let stateClone = JSON.parse(JSON.stringify(state));
  let newPieces = stateClone.pieces;
  let newSquares = stateClone.squares;
  let newBenchPieces = stateClone.benchPieces
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
      let shouldTurnEnd = true;
      let enemiesOnBoard = false;
      for (let column in newPieces) {
        for (let row in newPieces[column]) {
          let piece = newPieces[column][row];
          if (piece && piece.enemy === false && piece.exhausted === false) {
            shouldTurnEnd = false
          } else if (piece && piece.enemy === true) {
            enemiesOnBoard = true;
          }
        }
      }
      if (!enemiesOnBoard) {
        shouldTurnEnd = true;
      }
      return {
        ...stateClone, pieces: newPieces, shouldTurnEnd
      };
    case 'benchMove':
      const placeX = action.xDest;
      const placeY = action.yDest;
      newBenchPieces[action.piece.id] = null;
      newPieces = {
        ...newPieces,
        [placeX]: {
          ...newPieces[placeX],
          [placeY]: {
            ...action.piece,
            exhausted: true
          },
        },
      };
      return {
        ...stateClone, pieces: newPieces, benchPieces: newBenchPieces
      };
    case 'addBenchPieces':
      let length = newBenchPieces.length;
      action.pieces.forEach((pieceName, i) => {
        newBenchPieces.push({
          name: pieceName,
          enemy: false,
          id: length + i,
          exhausted: false,
        })
      })
      newBenchPieces = newBenchPieces.sort((a, b) => a.id - b.id);
      newBenchPieces.forEach((piece, i) => piece.id = i)
      const benchPieceClone2 = JSON.parse(JSON.stringify(newBenchPieces))


      return {
        ...stateClone,
        benchPieces: newBenchPieces,
          baseBenchPieces: benchPieceClone2,


      }
      case 'setup':
        newBenchPieces = [];
        newBenchPieces.push(getPieceWithRarity(3, 0));
        newBenchPieces.push(getPieceWithRarity(2, 1));
        newBenchPieces.push(getPieceWithRarity(2, 2));
        newBenchPieces.push(getPieceWithRarity(1, 3));
        newBenchPieces.push(getPieceWithRarity(1, 4));
        newBenchPieces.push(getPieceWithRarity(1, 5));
        const benchPieceClone = JSON.parse(JSON.stringify(newBenchPieces))
        const basePiecesClone = JSON.parse(JSON.stringify(initialState.pieces));
        const baseSquaresClone = JSON.parse(JSON.stringify(newSquares));
        return {
          ...stateClone,
          benchPieces: newBenchPieces,
            baseBenchPieces: benchPieceClone,
            baseSquares: baseSquaresClone,
            pieces: basePiecesClone,
            gamePhase: 'setup'
        }
        case 'reSetup':
          const basePiecesClone2 = JSON.parse(JSON.stringify(initialState.pieces));

          return {
            ...stateClone,
            pieces: basePiecesClone2,
              gamePhase: 'setup'
          }
          case 'startGame':
            for (let x = 0; x < 12; x++) {
              for (let y = 0; y < 12; y++) {
                if (newPieces[x][y]) {
                  newPieces[x][y].exhausted = false;
                }
              }
            }
            newPieces = randomizeEnemies(newPieces, state.wave);
            const currentPiecesClone = JSON.parse(JSON.stringify(newPieces));
            return {
              ...stateClone,
              pieces: newPieces,
                lastTurnPieceState: currentPiecesClone,
                gamePhase: 'inprogress'
            };
          case 'endTurn':
            for (let i = 0; i < 12; i++) {
              if (newPieces[i][11] !== null && newPieces[i][11].enemy) {
                return {
                  ...state,
                  gamePhase: 'gameover'
                }
              }
            }
            let gamePhase = 'inprogress'
            let enemyCount = 0;
            for (let x = 0; x < 12; x++) {
              for (let y = 0; y < 12; y++) {
                if (state.pieces[x][y] && state.pieces[x][y].enemy === true) {
                  state.pieces[x][y].fade = 'in';
                  enemyCount++;
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
            let newWave = state.wave
            let currentPiecesRecord;
            if (enemyCount === 0) {
              gamePhase = 'rewards';
              newWave = state.wave + 1;
              newBenchPieces = [];
              state.benchPieces.forEach((piece) => {
                if (piece) {
                  newBenchPieces.push(piece)
                }
              })
              for (let x = 0; x < 12; x++) {
                for (let y = 0; y < 12; y++) {
                  if (newPieces[x][y] && newPieces[x][y].enemy === false) {
                    newBenchPieces.push(newPieces[x][y])
                  }
                }
              }
              newBenchPieces = newBenchPieces.sort((a, b) => a.id - b.id)
              newBenchPieces.forEach((piece, i) => piece.id = i)
              currentPiecesRecord = JSON.parse(JSON.stringify(initialState.pieces))
            } else {
              currentPiecesRecord = JSON.parse(JSON.stringify(newPieces))
            }
            return {
              ...stateClone,
              pieces: newPieces,
                lastTurnPieceState: currentPiecesRecord,
                gamePhase: gamePhase,
                benchPieces: newBenchPieces,
                shouldTurnEnd: false,
                wave: newWave
            };
          case 'benchHighlight':
            for (let x = 0; x < 12; x++) {
              for (let y = 0; y < 12; y++) {
                if (newPieces[x][y] === null && y > 8 && action.canDrag) {
                  newSquares[x][y].canDrop = 'yes'
                } else {
                  newSquares[x][y].canDrop = 'no'
                }
              }
            }
            return {
              ...stateClone,
              squares: newSquares
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
              let [x, y] = [square[0], square[1]]
              let dropType = (newPieces[x][y] && newPieces[x][y].enemy === true) ? 'cap' : 'yes'
              newSquares[x][y] = {
                ...newSquares[x][y],
                canDrop: dropType
              };
            }
            return {
              ...stateClone,
              squares: newSquares
            };
          case 'enemyhighlight':
            const moveableSquare = getEnemyMoveSquare(
              action.x,
              action.y,
              newPieces
            );
            let cappableSquares = getAllEnemyCapSquares(action.x, action.y, newPieces) || [];
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
            cappableSquares.forEach((square) => {
              newSquares[square[0]][square[1]] = {
                ...newSquares[square[0]][square[1]],
                canDrop: 'enemycap'
              }
            })
            return {
              ...stateClone,
              squares: newSquares
            };
            //Call this to show squares if shown, not if not. enemyCaptureOn or enemyCaptureoff just toggle state
            //And should only be called in the showEnemyCapture button
          case 'showEnemyCapture':
            let squaresClone = state.baseSquares
            if (state.enemyCaptureShown) {
              let squares = [];
              for (let x = 0; x < 12; x++) {
                for (let y = 0; y < 12; y++) {
                  if (newPieces[x][y] && newPieces[x][y].enemy === true) {
                    squares = squares.concat(getAllEnemyCapSquares(x, y, newPieces));
                  }
                  newSquares[x][y].captureMark = false;
                  squaresClone[x][y].captureMark = false;
                }
              }
              squares.forEach((square) => {
                newSquares[square[0]][square[1]].captureMark = true;
                squaresClone[square[0]][square[1]].captureMark = true;
              })
            } else {
              for (let x = 0; x < 12; x++) {
                for (let y = 0; y < 12; y++) {
                  newSquares[x][y].captureMark = false;
                  squaresClone[x][y].captureMark = false
                }
              }
            }
            return {
              ...stateClone,
              squares: newSquares,
                baseSquares: squaresClone
            }
            case 'enemyCaptureOn':
              return {
                ...stateClone,
                enemyCaptureShown: true,
              };
            case 'enemyCaptureOff':
              return {
                ...stateClone,
                enemyCaptureShown: false,
              };
            case 'dehighlight':
              let otherSquaresClone = JSON.parse(JSON.stringify(stateClone.baseSquares))
              return {
                ...stateClone,
                squares: otherSquaresClone
              };
            case 'resetTurn':
              if (!stateClone.lastTurnPieceState) {
                return state;
              }
              newPieces = JSON.parse(JSON.stringify(stateClone.lastTurnPieceState));
              return {
                ...stateClone,
                pieces: newPieces,
                  shouldTurnEnd: false,
              };
            case 'resetSetup':
              for (let x = 0; x < 12; x++) {
                for (let y = 0; y < 12; y++) {
                  newPieces[x][y] = null
                }
              }
              newBenchPieces = JSON.parse(JSON.stringify(stateClone.baseBenchPieces));
              return {
                ...stateClone,
                pieces: newPieces,
                  benchPieces: newBenchPieces
              }
              case 'transitionstart':
                return {
                  ...stateClone,
                  gamePhase: 'transitionstart'
                }
                case 'transitioninprogress':
                  let otherEnemyCount = 0;
                  for (let x = 0; x < 12; x++) {
                    for (let y = 0; y < 12; y++) {
                      if (state.pieces[x][y] && state.pieces[x][y].enemy === true) {
                        newPieces[x][y].fade = 'out';
                        otherEnemyCount++;
                      }
                    }
                  }
                  return {
                    ...stateClone,
                    pieces: newPieces,
                      gamePhase: otherEnemyCount === 0 ? 'transitionrewards' : 'transitioninprogress'
                  }
                  case 'transitionrewards':
                    return {
                      ...stateClone,
                      gamePhase: 'transitionrewards'
                    }
                    case 'togglemute':
                      let volume = 0;
                      if (!state.volume) {
                        volume = .5;
                      }
                      return {
                        ...stateClone,
                        volume
                      }
                      default:
                        throw new Error('No reducer for action type');
  }
}