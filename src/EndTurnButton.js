import React, { useContext, useState } from 'react';
import { DispatchContext } from './util/Contexts';
import TransitionLayoutComponent from './wrappercomponents/TransitionLayoutComponent';
import ButtonWrapper from './wrappercomponents/ButtonWrapper';
import useSound from 'use-sound';
import selectSound from './audio/Menu1A.wav';

export default function EndTurnButton({ show, shouldTurnEnd }) {
  const dispatch = useContext(DispatchContext);
  const [myTimeOut, setMyTimeout] = useState(false);
  const [play] = useSound(selectSound, { volume: 0.4 });

  const endTurn = function endTurn(e) {
    play();
    dispatch({ type: 'transitioninprogress' });
    if (!myTimeOut) {
      setMyTimeout(true);
      setTimeout(() => {
        dispatch({ type: 'endTurn' });
        dispatch({ type: 'showEnemyCapture' });
        setMyTimeout(false);
      }, 300);
    }
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <ButtonWrapper isInner={false} image='beige'>
        <ButtonWrapper isInner={true} image='black'>
          <button
            className={shouldTurnEnd ? 'endturnbutton pulse' : 'endturnbutton'}
            onClick={endTurn}
            style={{ backgroundPosition }}
            ref={ref}>
            End Turn
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return <TransitionLayoutComponent show={show} transition='fade' timeIn={2000} timeOut={300} renderChild={renderFn} />;
}
