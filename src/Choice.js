import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import ChoicePiece from './ChoicePiece';

export default function Choice({ pieces, wide }) {
  const dispatch = useContext(DispatchContext);

  const handleClick = function handleClick(e) {
    dispatch({
      type: 'transitionrewards',
    });
    setTimeout(() => {
      dispatch({
        type: 'addBenchPieces',
        pieces: pieces,
      });
      dispatch({
        type: 'reSetup',
      });
      dispatch({
        type: 'clearChoices',
      });
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
