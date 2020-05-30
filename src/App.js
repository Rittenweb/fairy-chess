import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import StartButton from './StartButton';
import EndTurnButton from './EndTurnButton';
import ResetTurnButton from './ResetTurnButton';
import ShowMovesButton from './ShowMovesButton';
import { DispatchContext } from './Contexts';
import { initialState } from './baseStates';
import { reducer } from './reducers';

function App() {
  const [gameState, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
      <header></header>
      <main>
        <DispatchContext.Provider value={dispatch}>
          {!gameState.inProgress && <StartButton />}
          {gameState.inProgress && (
            <EndTurnButton enemyCapShown={gameState.enemyCaptureShown} />
          )}
          {gameState.inProgress && (
            <ResetTurnButton enemyCapShown={gameState.enemyCapShown} />
          )}
          {gameState.inProgress && (
            <ShowMovesButton shown={gameState.enemyCaptureShown} />
          )}
          <Board gameState={gameState} />
        </DispatchContext.Provider>
      </main>
    </div>
  );
}

export default App;
