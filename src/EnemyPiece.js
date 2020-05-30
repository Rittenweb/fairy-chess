import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function EnemyPiece({ piece, x, y }) {
  const dispatch = useContext(DispatchContext);

  const handleMouseOver = function handleMouseOver(e) {
    dispatch({
      type: 'enemyhighlight',
      x,
      y,
    });
  };

  const handleMouseLeave = function handleMouseLeave(e) {
    dispatch({
      type: 'dehighlight',
    });
  };

  return (
    <div
      className='piece'
      draggable='false'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <img
        className='piece-symbol'
        src={require(`./img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
    </div>
  );
}
