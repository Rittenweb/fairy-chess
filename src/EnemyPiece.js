import React, { useContext, useState } from 'react';
import { SquareDispatchContext } from './Contexts';
import Modal from './Modal';

export default function EnemyPiece({ piece, x, y }) {
  const dispatch = useContext(SquareDispatchContext);
  const [modalDisplay, setModalDisplay] = useState(false);

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
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <img
        className='piece-symbol'
        src={require(`./img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
    </div>
  );
}
