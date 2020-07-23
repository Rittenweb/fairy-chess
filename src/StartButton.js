import React, { useContext } from 'react';
import { DispatchContext } from './util/Contexts';
import useSound from 'use-sound';
import startSound from './audio/Puzzle Game 3.ogg';
import TransitionLayoutComponent from './wrappercomponents/TransitionLayoutComponent';
import ButtonWrapper from './wrappercomponents/ButtonWrapper';

export default function StartButton({ show, volume }) {
  const dispatch = useContext(DispatchContext);
  const [play] = useSound(startSound, {
    loop: true,
    volume,
  });

  const start = function start(e) {
    play();
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
          <button className='startbutton' onClick={start} style={{ backgroundPosition }} ref={ref}>
            Start Game
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return <TransitionLayoutComponent show={show} transition='fade' timeIn={2000} timeOut={400} renderChild={renderFn} />;
}
