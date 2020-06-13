import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function Choice({ pieces }) {
  const dispatch = useContext(DispatchContext);

  const handleClick = function handleClick(e) {
    dispatch({
      type: 'addBenchPieces',
      pieces: pieces,
    });
    // dispatch({
    //   type: 'reSetup'
    // })
  };

  return (
    <div onClick={handleClick} className='choice'>
      {pieces.map((piece) => {
        return (
          <img
            className={'piece-symbol'}
            src={require(`./img/${piece}.png`)}
            alt={`${piece}`}></img>
        );
      })}
    </div>
  );
}
