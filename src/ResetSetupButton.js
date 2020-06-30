import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';
import ButtonWrapper from './ButtonWrapper';
import useSound from 'use-sound';
import deselectSound from './audio/Menu1B.wav';

export default function ResetSetupButton({ show }) {
  const dispatch = useContext(DispatchContext);
  const [play] = useSound(deselectSound, { volume: 0.4 });

  const resetSetup = function resetSetup(e) {
    play();
    dispatch({
      type: 'resetSetup',
    });
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <ButtonWrapper isInner={false} image='beige'>
        <ButtonWrapper isInner={true} image='black'>
          <button
            className='resetsetupbutton'
            onClick={resetSetup}
            style={{ backgroundPosition }}
            ref={ref}>
            Reset Setup
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition={'fade'}
      timeIn={1000}
      timeOut={500}
      renderChild={renderFn}
    />
  );
}
