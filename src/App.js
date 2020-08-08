import React, { useReducer, Suspense } from 'react';
import './App.css';
import Board from './board/Board';
import Bench from './bench/Bench';
import Rewards from './rewards/Rewards';
import ScoreBoard from './ScoreBoard';
import StartButton from './StartButton';
import EndTurnButton from './EndTurnButton';
import ResetTurnButton from './ResetTurnButton';
import ShowMovesButton from './ShowMovesButton';
import ResetSetupButton from './ResetSetupButton';
import GameOverModal from './modals/GameOverModal';
import CornerButtons from './CornerButtons';
import Particles from './Particles';
import TransitionComponent from './wrappercomponents/TransitionComponent';
import { DispatchContext } from './util/Contexts';
import { initialState } from './util/baseStates';
import { reducer } from './util/reducers';

function App() {
  const [gameState, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
      <header></header>
      <main>
        <DispatchContext.Provider value={dispatch}>
          <div className='left-container'>
            <TransitionComponent show={gameState.gamePhase === 'start'} transition={'fade'} timeIn={500} timeOut={500}>
              <div className='big-text'>Fairy Chess</div>
            </TransitionComponent>
            <TransitionComponent
              show={gameState.gamePhase === 'rewards'}
              transition={'fade'}
              timeIn={1000}
              timeOut={300}>
              <div className='big-text'>Take One</div>
            </TransitionComponent>
            <StartButton show={gameState.gamePhase === 'start'} volume={gameState.volume} />
            <ResetSetupButton show={gameState.gamePhase === 'setup'} />
            <EndTurnButton
              show={gameState.gamePhase === 'inprogress' || gameState.gamePhase === 'transitioninprogress'}
              shouldTurnEnd={gameState.shouldTurnEnd}
            />
            <ResetTurnButton
              show={gameState.gamePhase === 'inprogress' || gameState.gamePhase === 'transitioninprogress'}
            />
            <ShowMovesButton
              captureShown={gameState.enemyCaptureShown}
              show={gameState.gamePhase === 'inprogress' || gameState.gamePhase === 'transitioninprogress'}
            />
          </div>
          <div className='main-container'>
            <TransitionComponent
              show={gameState.gamePhase !== 'rewards' && gameState.gamePhase !== 'transitionrewards'}
              transition={'fade'}
              timeIn={300}
              timeOut={300}>
              <Board gameState={gameState} />
            </TransitionComponent>
            <TransitionComponent
              show={gameState.gamePhase === 'rewards'}
              transition={'fade'}
              timeIn={1000}
              timeOut={300}>
              <Suspense fallback={<></>}>
                <Rewards choices={gameState.choicesList} />
              </Suspense>
            </TransitionComponent>
          </div>
          <div className='right-container'>
            <ScoreBoard score={gameState.wave} />
            <Bench gameState={gameState} />
          </div>
          {gameState.gamePhase === 'gameover' && <GameOverModal score={gameState.wave} />}
        </DispatchContext.Provider>
      </main>
      {/* Fixed elements below here */}
      <div className='modal-background mobile-modal'>Touch events not yet supported! Please play on desktop.</div>
      <div className='app-background'></div>
      <Particles />
      <CornerButtons gamePhase={gameState.gamePhase} volume={gameState.volume} />
    </div>
  );
}

export default App;
