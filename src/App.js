import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import StartButton from './StartButton';
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
import { getMoveableSquares } from './pieceData';

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
            9: action.piece1,
          },
          4: {
            ...stateClone[4],
            9: action.piece2,
          },
          5: {
            ...stateClone[5],
            9: action.piece3,
          },
          6: {
            ...stateClone[6],
            9: action.piece4,
          },
          7: {
            ...stateClone[7],
            9: action.piece5,
          },
          8: {
            ...stateClone[8],
            9: action.piece6,
          },
        };
        console.log(newState);
        return newState;
      default:
        throw new Error('No piece reducer for action type');
    }
  }

  function squareReducer(state, action) {
    switch (action.type) {
      case 'highlight':
        let newState = JSON.parse(JSON.stringify(state));
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
              <Board pieceState={pieceState} squareState={squareState} />
            </SquareDispatchContext.Provider>
          </PieceDispatchContext.Provider>
        </GameDispatchContext.Provider>
      </main>
    </div>
  );
}

export default App;
