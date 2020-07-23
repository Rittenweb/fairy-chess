import React, { useContext } from 'react';
import HelpButton from './HelpButton';
import { DispatchContext } from './util/Contexts';

export default function CornerButtons({ gamePhase, volume }) {
  const dispatch = useContext(DispatchContext);

  return (
    <>
      {gamePhase === 'start' && (
        <a href='https://icons8.com/' className='corner-button' style={{ left: 0 }}>
          Icons by Icons8
        </a>
      )}
      {gamePhase === 'start' && (
        <a
          href='https://www.colourlovers.com/pattern/template/16/Pattern_16'
          className='corner-button'
          style={{ right: 0 }}>
          Pattern template by COLOURlover
        </a>
      )}
      {gamePhase !== 'start' && (
        <div
          className='corner-button'
          style={{ right: 0, cursor: 'pointer' }}
          onClick={() => dispatch({ type: 'togglemute' })}>
          {volume ? 'Mute Music' : 'Unmute Music'}
        </div>
      )}
      {gamePhase !== 'start' && <HelpButton gamePhase={gamePhase} />}
    </>
  );
}
