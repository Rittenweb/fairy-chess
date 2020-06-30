import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';
import ButtonWrapper from './ButtonWrapper';

export default function StartButton({ show }) {
  const dispatch = useContext(DispatchContext);

  const start = function start(e) {
    dispatch({
      type: 'transitionstart',
    });
    setTimeout(() => {
      dispatch({
        type: 'setup',
      });
      //This dispatch initializes squareState. Not the cleanest, but currently necessary.
      dispatch({
        type: 'showEnemyCapture',
      });
    }, 500);
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <ButtonWrapper isInner={false} image='beige'>
        <ButtonWrapper isInner={true} image='black'>
          <button
            className='startbutton'
            onClick={start}
            style={{ backgroundPosition }}
            ref={ref}>
            Play Again?
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition='fade'
      timeIn={2000}
      timeOut={400}
      renderChild={renderFn}
    />
  );
}
