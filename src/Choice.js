import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import ChoicePiece from './ChoicePiece';

export default function Choice({ pieces, wide, clear }) {
  const dispatch = useContext(DispatchContext);

  const handleClick = function handleClick(e) {
    dispatch({
      type: 'transitionrewards',
    });
    dispatch({
      type: 'addBenchPieces',
      pieces: pieces,
    });

    setTimeout(() => {
      dispatch({
        type: 'reSetup',
      });
      console.log('clear');
      clear();
    }, 300);
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
