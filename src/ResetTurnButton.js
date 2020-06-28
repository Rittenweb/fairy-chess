import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';
import ButtonWrapper from './ButtonWrapper';

export default function ResetTurnButton({ show }) {
  const dispatch = useContext(DispatchContext);

  const resetturn = function resetturn(e) {
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
          <button
            className='resetturnbutton'
            onClick={resetturn}
            style={{ backgroundPosition }}
            ref={ref}>
            Reset Turn
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition={'fade'}
      timeIn={2000}
      timeOut={300}
      renderChild={renderFn}
    />
  );
}
