import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import ChoicePiece from './ChoicePiece';

export default function Choice({ pieces }) {
  const dispatch = useContext(DispatchContext);

  const handleClick = function handleClick(e) {
    dispatch({
      type: 'addBenchPieces',
      pieces: pieces,
    });
    // dispatch({
    //   type: 'reSetup',
    // });
    // dispatch({
    //   type: 'clearChoices'
    // })
  };

  return (
    <div onClick={handleClick} className='choice'>
      {pieces.map((piece, i) => (
        <ChoicePiece name={piece} key={i} />
      ))}
    </div>
  );
}
