import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionComponent from './TransitionComponent';

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

  return (
    <TransitionComponent show={show} transition={'fade'} time={500}>
      {ready && (
        <button className='readybutton' onClick={setup}>
          I'm Ready
        </button>
      )}
      {!ready && (
        <div className='readybutton'>{`${commonNum}/3 Common, ${uncommonNum}/2 Uncommon, ${rareNum}/1 Rare`}</div>
      )}
    </TransitionComponent>
  );
}
