import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import StartButton from './StartButton';
import EndTurnButton from './EndTurnButton';
import ShowMovesButton from './ShowMovesButton';
import {
  PieceDispatchContext,
  SquareDispatchContext,
  GameDispatchContext,
} from './Contexts';
import {
  initialPieceState,
  initialSquareState,
  initialGameState,
} from './Constants';
import {
  getMoveableSquares,
  getEnemyMoveSquare,
  getEnemyCapSquare,
} from './pieceData';

function App() {
  const [pieceState, pieceDispatch] = useReducer(
    pieceReducer,
    initialPieceState
  );
  const [squareState, squareDispatch] = useReducer(
    squareReducer,
    initialSquareState
  );
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

  function pieceReducer(state, action) {
    let stateClone;
    let newState;
    switch (action.type) {
      case 'move':
        const oldX = action.xOrg;
        const oldY = action.yOrg;
        const newX = action.xDest;
        const newY = action.yDest;
        if (oldX === newX && oldY === newY) {
          return state;
        }
        stateClone = JSON.parse(JSON.stringify(state));

        newState = {
          ...stateClone,
          [oldX]: {
            ...stateClone[oldX],
            [oldY]: null,
          },
        };
        newState = {
          ...newState,
          [newX]: {
            ...newState[newX],
            [newY]: action.piece,
          },
        };
        return newState;
      case 'setup':
        stateClone = JSON.parse(JSON.stringify(state));
        newState = {
          ...stateClone,
          3: {
            ...stateClone[3],
            1: { name: 'shroom', enemy: true },
            9: action.piece1,
          },
          4: {
            ...stateClone[4],
            1: { name: 'shroom', enemy: true },
            9: action.piece2,
          },
          5: {
            ...stateClone[5],
            1: { name: 'dandy', enemy: true },
            9: action.piece3,
          },
          6: {
            ...stateClone[6],
            1: { name: 'dandy', enemy: true },
            9: action.piece4,
          },
          7: {
            ...stateClone[7],
            1: { name: 'shroom', enemy: true },
            9: action.piece5,
          },
          8: {
            ...stateClone[8],
            1: { name: 'shroom', enemy: true },
            9: action.piece6,
          },
        };
        return newState;
      case 'endturn':
        newState = JSON.parse(JSON.stringify(state));
        for (let x = 0; x < 12; x++) {
          for (let y = 0; y < 12; y++) {
            if (state[x][y] && state[x][y].enemy === true) {
              let capSquare = getEnemyCapSquare(x, y, newState);
              if (capSquare) {
                newState = {
                  ...newState,
                  [x]: {
                    ...newState[x],
                    [y]: null,
                  },
                };
                newState = {
                  ...newState,
                  [capSquare[0]]: {
                    ...newState[capSquare[0]],
                    [capSquare[1]]: state[x][y],
                  },
                };
              } else {
                let newSquare = getEnemyMoveSquare(x, y, newState);
                if (newSquare) {
                  newState = {
                    ...newState,
                    [x]: {
                      ...newState[x],
                      [y]: null,
                    },
                  };
                  newState = {
                    ...newState,
                    [newSquare[0]]: {
                      ...newState[newSquare[0]],
                      [newSquare[1]]: state[x][y],
                    },
                  };
                }
              }
            }
          }
        }

        return newState;
      default:
        throw new Error('No piece reducer for action type');
    }
  }

  function squareReducer(state, action) {
    let newState;
    switch (action.type) {
      case 'highlight':
        newState = JSON.parse(JSON.stringify(state));
        const moveableSquares = getMoveableSquares(
          action.x,
          action.y,
          action.pieceName,
          pieceState
        );
        for (let x = 0; x < 12; x++) {
          for (let y = 0; y < 12; y++) {
            newState[x][y] = 'no';
          }
        }
        for (const square of moveableSquares) {
          newState[square[0]][square[1]] = 'yes';
        }
        return newState;
      case 'enemyhighlight':
        newState = JSON.parse(JSON.stringify(state));
        const moveableSquare = getEnemyMoveSquare(
          action.x,
          action.y,
          pieceState
        );
        for (let x = 0; x < 12; x++) {
          for (let y = 0; y < 12; y++) {
            newState[x][y] = 'no';
          }
        }
        if (moveableSquare) {
          newState[moveableSquare[0]][moveableSquare[1]] = 'yes';
        }
        return newState;
      case 'dehighlight':
        return initialSquareState;
      default:
        throw new Error('No square reducer for action type');
    }
  }

  function gameReducer(state, action) {
    switch (action.type) {
      case 'gamestart':
        let stateClone = JSON.parse(JSON.stringify(state));
        return {
          ...stateClone,
          inProgress: true,
        };
      default:
        throw new Error('No game reducer for action type');
    }
  }

  return (
    <div className='App'>
      <header></header>
      <main>
        <GameDispatchContext.Provider value={gameDispatch}>
          <PieceDispatchContext.Provider value={pieceDispatch}>
            <SquareDispatchContext.Provider value={squareDispatch}>
              {!gameState.inProgress && <StartButton />}
              {gameState.inProgress && <EndTurnButton />}
              {gameState.inProgress && <ShowMovesButton />}
              <Board pieceState={pieceState} squareState={squareState} />
            </SquareDispatchContext.Provider>
          </PieceDispatchContext.Provider>
        </GameDispatchContext.Provider>
      </main>
    </div>
  );
}

export default App;
