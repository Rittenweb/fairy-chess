import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import ChoicePiece from './ChoicePiece';

export default function Choice({ pieces, wide, clear }) {
  const dispatch = useContext(DispatchContext);
  const [myTimeout, setMyTimeout] = useState(false);

  const handleClick = function handleClick(e) {
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
      className='choice'
      style={{
        width: wide ? '12vw' : '6vw',
        minWidth: wide ? '210px' : '80px',
      }}>
      {pieces.map((piece, i) => (
        <ChoicePiece name={piece} key={i} />
      ))}
    </div>
  );
}
