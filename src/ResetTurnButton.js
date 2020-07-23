import React, { useContext } from 'react';
import { DispatchContext } from './util/Contexts';
import TransitionLayoutComponent from './wrappercomponents/TransitionLayoutComponent';
import ButtonWrapper from './wrappercomponents/ButtonWrapper';
import useSound from 'use-sound';
import deselectSound from './audio/Menu1B.wav';

export default function ResetTurnButton({ show }) {
  const dispatch = useContext(DispatchContext);
  const [play] = useSound(deselectSound, { volume: 0.4 });

  const resetturn = function resetturn(e) {
    play();
    dispatch({
      type: 'resetTurn',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <ButtonWrapper isInner={false} image='beige'>
        <ButtonWrapper isInner={true} image='black'>
          <button className='resetturnbutton' onClick={resetturn} style={{ backgroundPosition }} ref={ref}>
            Reset Turn
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return (
    <TransitionLayoutComponent show={show} transition={'fade'} timeIn={2000} timeOut={300} renderChild={renderFn} />
  );
}
