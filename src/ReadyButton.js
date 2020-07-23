import React, { useContext } from 'react';
import { DispatchContext } from './util/Contexts';
import TransitionLayoutComponent from './wrappercomponents/TransitionLayoutComponent';
import useSound from 'use-sound';
import enemySound from './audio/41.ogg';

export default function ReadyButton({ ready, rareNum, uncommonNum, commonNum, show }) {
  const dispatch = useContext(DispatchContext);
  const [play] = useSound(enemySound, { volume: 0.3 });

  const setup = function setup(e) {
    play();
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
      <button className='readybutton pulse' style={{ backgroundPosition }} onClick={setup} ref={ref}>
        I'm Ready
      </button>
    ) : (
      <div className='readybutton pre-ready' style={{ backgroundPosition }} ref={ref}>
        <div className='ready-type'>
          <div className='ready-rarity'>Common</div>
          <div className='ready-num'>{`${commonNum}/3`}</div>
        </div>
        <div className='ready-type'>
          <div className='ready-rarity'>Uncommon</div>
          <div className='ready-num'>{`${uncommonNum}/2`}</div>{' '}
        </div>
        <div className='ready-type'>
          <div className='ready-rarity'>Rare</div>
          <div className='ready-num'>{`${rareNum}/1`}</div>{' '}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '30vw' }}>
      <TransitionLayoutComponent show={show} transition={'fade'} timeIn={500} timeOut={500} renderChild={renderFn} />
    </div>
  );
}
