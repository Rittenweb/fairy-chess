import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import { PieceDispatchContext, SquareDispatchContext } from './Contexts';
import { initialPieceState, initialSquareState } from './Constants';
import { pieceReducer, squareReducer } from './Reducers';

function App() {
  const [pieceState, pieceDispatch] = useReducer(
    pieceReducer,
    initialPieceState
  );
  const [squareState, squareDispatch] = useReducer(
    squareReducer,
    initialSquareState
  );

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
