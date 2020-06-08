import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import StartButton from './StartButton';
import EndTurnButton from './EndTurnButton';
import ResetTurnButton from './ResetTurnButton';
import ShowMovesButton from './ShowMovesButton';
import GameOverModal from './GameOverModal';
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
          {gameState.gamePhase === 'start' && <StartButton gameOver={false} />}
          {gameState.gamePhase === 'inprogress' && (
            <EndTurnButton enemyCapShown={gameState.enemyCaptureShown} />
          )}
          {gameState.gamePhase === 'inprogress' && (
            <ResetTurnButton enemyCapShown={gameState.enemyCapShown} />
          )}
          {gameState.gamePhase === 'inprogress' && (
            <ShowMovesButton shown={gameState.enemyCaptureShown} />
          )}
          {gameState.gamePhase === 'gameover' && <GameOverModal />}
          <Board gameState={gameState} />
        </DispatchContext.Provider>
      </main>
    </div>
  );
}

export default App;
