import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';
import Bench from './Bench';
import Rewards from './Rewards';
import ScoreBoard from './ScoreBoard';
import StartButton from './StartButton';
import EndTurnButton from './EndTurnButton';
import ResetTurnButton from './ResetTurnButton';
import ShowMovesButton from './ShowMovesButton';
import ResetSetupButton from './ResetSetupButton';
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
          <div className='left-container'>
            {gameState.gamePhase === 'start' && (
              <div className='big-text'>Fairy Chess</div>
            )}
            {gameState.gamePhase === 'rewards' && (
              <div className='big-text'>Reward Phase</div>
            )}
            {gameState.gamePhase === 'setup' && <ResetSetupButton />}
            {gameState.gamePhase === 'inprogress' && <EndTurnButton />}
            {gameState.gamePhase === 'inprogress' && <ResetTurnButton />}
            {gameState.gamePhase === 'inprogress' && (
              <ShowMovesButton shown={gameState.enemyCaptureShown} />
            )}
          </div>
          <div className='main-container'>
            {gameState.gamePhase === 'start' && (
              <StartButton gameOver={false} />
            )}
            {gameState.gamePhase !== 'rewards' && (
              <Board gameState={gameState} />
            )}
            {gameState.gamePhase === 'rewards' && (
              <Rewards gameState={gameState} />
            )}
          </div>
          <div className='right-container'>
            <ScoreBoard score={gameState.wave} />
            <Bench gameState={gameState} />
          </div>
          {gameState.gamePhase === 'gameover' && (
            <GameOverModal score={gameState.wave} />
          )}
        </DispatchContext.Provider>
      </main>
    </div>
  );
}

export default App;
