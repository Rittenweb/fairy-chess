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
import Particles from './Particles';
import TransitionComponent from './TransitionComponent';
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
            <TransitionComponent
              show={gameState.gamePhase === 'start'}
              transition={'fade'}
              time={500}>
              <div className='big-text'>Fairy Chess</div>
            </TransitionComponent>
            <TransitionComponent
              show={gameState.gamePhase === 'rewards'}
              transition={'slideUp'}
              time={300}>
              <div className='big-text'>Reward Phase</div>
            </TransitionComponent>
            <ResetSetupButton show={gameState.gamePhase === 'setup'} />
            {(gameState.gamePhase === 'inprogress' ||
              gameState.gamePhase === 'transitioninprogress') && (
              <EndTurnButton />
            )}
            <ResetTurnButton
              show={
                gameState.gamePhase === 'inprogress' ||
                gameState.gamePhase === 'transitioninprogress'
              }
            />
            <ShowMovesButton
              captureShown={gameState.enemyCaptureShown}
              show={
                gameState.gamePhase === 'inprogress' ||
                gameState.gamePhase === 'transitioninprogress'
              }
            />
          </div>
          <div className='main-container'>
            {gameState.gamePhase === 'start' && (
              <StartButton gameOver={false} />
            )}

            <TransitionComponent
              show={
                gameState.gamePhase !== 'rewards' &&
                gameState.gamePhase !== 'transitionrewards'
              }
              transition={'fade'}
              time={300}>
              <Board gameState={gameState} />
            </TransitionComponent>
            <TransitionComponent
              show={gameState.gamePhase === 'rewards'}
              transition={'slideDown'}
              time={300}>
              <Rewards />
            </TransitionComponent>
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
      <div className='modal-background mobile-modal'>
        Touch events not yet supported! Please play on desktop.
      </div>
      <div className='app-background'></div>
      <Particles />
    </div>
  );
}

export default App;
