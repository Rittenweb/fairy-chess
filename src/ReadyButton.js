import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';

export default function ReadyButton({
  ready,
  rareNum,
  uncommonNum,
  commonNum,
  show,
}) {
  const dispatch = useContext(DispatchContext);

  const setup = function setup(e) {
    dispatch({
      type: 'transitionstart',
    });
    setTimeout(() => {
      dispatch({
        type: 'startGame',
      });
      dispatch({
        type: 'showEnemyCapture',
      });
    }, 500);
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return ready ? (
      <button
        className='readybutton'
        onClick={setup}
        style={{ backgroundPosition }}
        ref={ref}>
        I'm Ready
      </button>
    ) : (
      <div
        className='readybutton'
        style={{ backgroundPosition }}
        ref={
          ref
        }>{`${commonNum}/3 Common, ${uncommonNum}/2 Uncommon, ${rareNum}/1 Rare`}</div>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition={'fade'}
      timeIn={500}
      timeOut={500}
      renderChild={renderFn}
    />
  );
}
