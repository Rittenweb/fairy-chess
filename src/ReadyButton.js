import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function ReadyButton({
  ready,
  rareNum,
  uncommonNum,
  commonNum,
}) {
  const dispatch = useContext(DispatchContext);

  const setup = function setup(e) {
    dispatch({
      type: 'startGame',
    });
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  return (
    <>
      {ready && (
        <button className='readybutton' onClick={setup}>
          I'm Ready
        </button>
      )}
      {!ready && (
        <div className='readybutton'>{`${commonNum}/3 Common, ${uncommonNum}/2 Uncommon, ${rareNum}/1 Rare`}</div>
      )}
    </>
  );
}
