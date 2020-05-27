import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import { PieceDispatchContext, SquareDispatchContext } from './Contexts';
import { initialPieceState, initialSquareState } from './Constants';
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

  function pieceReducer(state, action) {
    switch (action.type) {
      case 'move':
        const oldX = action.xOrg;
        const oldY = action.yOrg;
        const newX = action.xDest;
        const newY = action.yDest;
        if (oldX === newX && oldY === newY) {
          return state;
        }
        let stateClone = JSON.parse(JSON.stringify(state));

        let newState = {
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
      case 'else':
        return {};
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

  return (
    <div className='App'>
      <header></header>
      <main>
        <PieceDispatchContext.Provider value={pieceDispatch}>
          <SquareDispatchContext.Provider value={squareDispatch}>
            <Board pieceState={pieceState} squareState={squareState} />
          </SquareDispatchContext.Provider>
        </PieceDispatchContext.Provider>
      </main>
    </div>
  );
}

export default App;
