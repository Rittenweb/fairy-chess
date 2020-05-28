import React, { useContext, useState } from 'react';
import { SquareDispatchContext } from './Contexts';
import Modal from './Modal';

export default function EnemyPiece({ piece, x, y }) {
  const dispatch = useContext(SquareDispatchContext);
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleMouseOver = function handleMouseOver(e) {
    dispatch({
      type: 'highlight',
      pieceName: piece.name,
      x,
      y,
    });
  };

  const handleMouseLeave = function handleMouseLeave(e) {
    dispatch({
      type: 'dehighlight',
    });
  };

  const handleRightClick = function handleRightClick(e) {
    e.preventDefault();
    setModalDisplay(!modalDisplay);
  };

  return (
    <div
      className='piece'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}>
      <img
        className='piece-symbol'
        src={require(`./img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
      {modalDisplay && (
        <Modal piece={piece} handleClick={handleRightClick}></Modal>
      )}
    </div>
  );
}
