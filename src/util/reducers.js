import {
  getMoveableSquares,
  getEnemyMoveSquare,
  getAllEnemyCapSquares,
  randomizeEnemies,
  getPieceWithRarity
} from './pieceData';
import {
  initialState
} from './baseStates'
import checkTurnEnd from './checkTurnEnd'
import takeEnemyTurn from './takeEnemyTurn'
import fillBenchAfterWin from './fillBenchAfterWin';
import highlightSquares from './highlightSquares'
import highlightEnemySquares from './highlightEnemySquares'
import markCaptureSquares from './markCaptureSquares';

export const reducer = function reducer(state, action) {
  //The state is deep-nested, so we need to clone it so we can make mutations while keeping a reference to the old state.
  let stateClone = JSON.parse(JSON.stringify(state));
  //These three pieces of state will be the most frequently used.
  let newPieces = stateClone.pieces;
  let newSquares = stateClone.squares;
  let newBenchPieces = stateClone.benchPieces

  //Initialize clone objects pointers which will be needed later, but switch/case is all one block scope
  let piecesClone;
  let squaresClone;
  let benchPiecesClone;

  switch (action.type) {
    //A standard move of a piece from one square to another.
    //If an enemy piece is in the new location, its object representation will simply be overwritten
    case 'move':
      const oldX = action.xOrg;
      const oldY = action.yOrg;
      const newX = action.xDest;
      const newY = action.yDest;
      if (oldX === newX && oldY === newY) {
        return state;
      }


      //Move the piece, leaving the old position empty
      newPieces[oldX][oldY] = null;
      newPieces[newX][newY] = {
        ...action.piece,
        exhausted: true
      };

      let shouldTurnEnd = checkTurnEnd(newPieces);

      return {
        ...stateClone, pieces: newPieces, shouldTurnEnd
      };
      //Moving a piece from the bench onto the board
    case 'moveFromBench':
      const placeX = action.xDest;
      const placeY = action.yDest;
      newBenchPieces[action.piece.id] = null; //Clear the piece from its place on the bench via ID
      newPieces[placeX][placeY] = {
        ...action.piece,
        exhausted: true
      }

      return {
        ...stateClone, pieces: newPieces, benchPieces: newBenchPieces
      };
      //Populate the bench with pre-generated pieces, passed-in via action
    case 'addBenchPieces':
      let length = newBenchPieces.length;
      action.pieces.forEach((pieceName, i) => {
        newBenchPieces.push({
          name: pieceName,
          enemy: false,
          id: length + i, //Pieces will start after the last current piece (at id 'length')
          exhausted: false,
        })
      })
      //Pieces are referred to by their id, so they must be in the correct order
      newBenchPieces = newBenchPieces.sort((a, b) => a.id - b.id);
      newBenchPieces.forEach((piece, i) => piece.id = i)
      //Need a clone so that the reference object for bench reset (base bench pieces) is not altered by moving
      benchPiecesClone = JSON.parse(JSON.stringify(newBenchPieces))
      return {
        ...stateClone,
        benchPieces: newBenchPieces,
          baseBenchPieces: benchPiecesClone,
      }
      //At the beginning of the game, generate the starting pieces
      case 'setup':
        newBenchPieces = [];
        //First argument is the piece's rarity: 1 of rarity 3, 2 of rarity 2, 3 of rarit 1, for game balance
        //Second argument is the piece's id, which is used to keep them in order when they're reset
        newBenchPieces.push(getPieceWithRarity(3, 0));
        newBenchPieces.push(getPieceWithRarity(2, 1));
        newBenchPieces.push(getPieceWithRarity(2, 2));
        newBenchPieces.push(getPieceWithRarity(1, 3));
        newBenchPieces.push(getPieceWithRarity(1, 4));
        newBenchPieces.push(getPieceWithRarity(1, 5));

        benchPiecesClone = JSON.parse(JSON.stringify(newBenchPieces)); //Clone for bench base reference
        squaresClone = JSON.parse(JSON.stringify(newSquares)); //Clone for squares base reference
        piecesClone = JSON.parse(JSON.stringify(initialState.pieces)); //Clone from static initialization object

        return {
          ...stateClone,
          benchPieces: newBenchPieces,
            baseBenchPieces: benchPiecesClone,
            baseSquares: squaresClone,
            pieces: piecesClone,
            gamePhase: 'setup'
        }

        //Setup for the second through infinitieth time. Just wipe the board.
        case 'reSetup':
          piecesClone = JSON.parse(JSON.stringify(initialState.pieces));

          return {
            ...stateClone,
            pieces: piecesClone,
              gamePhase: 'setup'
          }

          //After the player has finished moving their pieces from the bench to the board.
          //This case populates the board with enemies and begins the game.
          case 'startGame':
            //Set all allied pieces that have been placed to ready
            for (let x = 0; x < 12; x++) {
              for (let y = 0; y < 12; y++) {
                if (newPieces[x][y]) {
                  newPieces[x][y].exhausted = false;
                }
              }
            }
            newPieces = randomizeEnemies(newPieces, state.wave); //Add enemies

            //Make a clone of the piece state for reset turn reference
            piecesClone = JSON.parse(JSON.stringify(newPieces));

            return {
              ...stateClone,
              pieces: newPieces,
                lastTurnPieceState: piecesClone,
                gamePhase: 'inprogress'
            };

            //When the 'end turn' button is pressed. Lots to check and update here. Primarily, it's
            //the enemies' turn to move and capture, but the game might also be won.
          case 'endTurn':

            //If any enemy is on the last rank of the board, it's game over.
            for (let i = 0; i < 12; i++) {
              if (newPieces[i][11] !== null && newPieces[i][11].enemy) {
                return {
                  ...state,
                  gamePhase: 'gameover'
                }
              }
            }

            let gamePhase = 'inprogress' //Change the phase from 'end turn transition' phase
            let enemyCount = 0; //If this count ultimately stays at zero after checking, the game is won.

            console.log(newPieces);

            [newPieces, enemyCount] = takeEnemyTurn(newPieces, enemyCount);

            console.log(newPieces);

            let newWave = state.wave

            if (enemyCount === 0) {
              gamePhase = 'rewards';
              newWave = state.wave + 1; //Difficulty increases after he game is won

              newBenchPieces = fillBenchAfterWin(state.benchPieces, newPieces)

              piecesClone = JSON.parse(JSON.stringify(initialState.pieces)) //Clear the 'reset turn' base
            } else {
              piecesClone = JSON.parse(JSON.stringify(newPieces)) //Set the 'reset turn' base reference
            }

            return {
              ...stateClone,
              pieces: newPieces,
                lastTurnPieceState: piecesClone,
                gamePhase: gamePhase,
                benchPieces: newBenchPieces,
                shouldTurnEnd: false,
                wave: newWave
            };

            //When dragging pieces from the bench to the board, only the last three rows should highlight.
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

            //When dragging a piece around the board, determine and highlight all the squares it can move to
          case 'highlight':
            //Get an array of all the squares the piece specified in the action can move to
            const moveableSquares = getMoveableSquares(
              action.x,
              action.y,
              action.pieceName,
              newPieces
            );

            //Represent those squares in the global state
            newSquares = highlightSquares(newSquares, newPieces, moveableSquares)

            return {
              ...stateClone,
              squares: newSquares
            };

            //Highlight the squares an enemy can move to or capture
          case 'enemyhighlight':
            const moveableSquare = getEnemyMoveSquare(
              action.x,
              action.y,
              newPieces
            ); //Will return a single tuple representing a square (enemies only have one move option)
            let cappableSquares = getAllEnemyCapSquares(action.x, action.y, newPieces) || [];

            //Represent those squares in the global state
            newSquares = highlightEnemySquares(newSquares, moveableSquare, cappableSquares)

            return {
              ...stateClone,
              squares: newSquares
            };

            //Call this to show red squares if shown=true, not if not. enemyCaptureOn or enemyCaptureoff action types
            //just toggle the state, nothing else, and should only be called by the showEnemyCapture button component.
          case 'showEnemyCapture':

            //baseSquares must remain totally separate from squares, but their capture marks must match
            squaresClone = state.baseSquares;

            if (state.enemyCaptureShown) {
              [newSquares, squaresClone] = markCaptureSquares(newPieces, newSquares, squaresClone)
            }
            //If the setting was just toggled off, all capture marks should be overwritten
            else {
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

            //When the 'show enemy capture' button is pressed, toggle state.
            //Call this right before 'showEnemyCapture'
            case 'enemyCaptureOn':
              return {
                ...stateClone,
                enemyCaptureShown: true,
              };

              //When the 'hide enemy capture' button is pressed, toggle state.
              //Call this right before 'showEnemyCapture'
            case 'enemyCaptureOff':
              return {
                ...stateClone,
                enemyCaptureShown: false,
              };


            case 'dehighlight':
              //Base squares must be a separate object from normal squares, can't just pass in squares
              squaresClone = JSON.parse(JSON.stringify(stateClone.baseSquares))
              return {
                ...stateClone,
                squares: squaresClone
              };

              //Access the last turn reference state, and set it as the current state
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

              //Access the bench start reference state, and set it as the current state
            case 'resetSetup':
              //Wipe the board of all pieces as well
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

              //Change the game phase temporarily for an animation buffer
              case 'transitionstart':
                return {
                  ...stateClone,
                  gamePhase: 'transitionstart'
                }

                //Change the game phase temporarily for an animation buffer
                case 'transitioninprogress':

                  //If the game is won (enemy count remans zero) a different transition is needed
                  let otherEnemyCount = 0;
                  for (let x = 0; x < 12; x++) {
                    for (let y = 0; y < 12; y++) {
                      if (state.pieces[x][y] && state.pieces[x][y].enemy === true) {
                        newPieces[x][y].fade = 'out'; //Set the temporary animation for all moving pieces (all enemy pieces)
                        otherEnemyCount++;
                      }
                    }
                  }

                  return {
                    ...stateClone,
                    pieces: newPieces,
                      gamePhase: otherEnemyCount === 0 ? 'transitionrewards' : 'transitioninprogress'
                  }

                  //Change the game phase temporarily for an animation buffer
                  case 'transitionrewards':
                    return {
                      ...stateClone,
                      gamePhase: 'transitionrewards'
                    }

                    //Change the global music volume when the mute button is clicked
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