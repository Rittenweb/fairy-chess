import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { DispatchContext } from '../util/Contexts';
import ChoicePiece from './ChoicePiece';
import useSound from 'use-sound';
import getSound from '../audio/999 Get Frog Coin.ogg';

export default function Choice({ pieces, wide, clear }) {
  const dispatch = useContext(DispatchContext);
  const [myTimeout, setMyTimeout] = useState(false);
  const [xy, setXY] = useState([0, 0]);
  const ref = useRef(null);
  const [play] = useSound(getSound, { volume: 0.6 });

  const updatePosition = function update() {
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect();
      setXY([rect.x, rect.y]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  });

  useLayoutEffect(() => {
    setTimeout(updatePosition, 100);
  }, []);

  const handleClick = function handleClick(e) {
    play();
    dispatch({
      type: 'transitionrewards',
    });

    if (!myTimeout) {
      setMyTimeout(true);
      setTimeout(() => {
        dispatch({
          type: 'addBenchPieces',
          pieces: pieces,
        });

        dispatch({
          type: 'reSetup',
        });
        clear();
        setMyTimeout(false);
      }, 300);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='choice clickable'
      ref={ref}
      style={{
        width: wide ? '12vw' : '6vw',
        minWidth: wide ? '210px' : '80px',
        backgroundPosition: `left -${xy[0]}px top -${xy[1]}px`,
      }}>
      {pieces.map((piece, i) => (
        <ChoicePiece name={piece} key={i} />
      ))}
    </div>
  );
}
