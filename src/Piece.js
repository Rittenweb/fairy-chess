import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import Modal from './Modal';

export default function Piece({ piece, x, y }) {
  const dispatch = useContext(DispatchContext);
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleDragStart = function handleDragStart(e) {
    const obj = { piece, x, y };
    const json = JSON.stringify(obj);
    e.dataTransfer.setData('text/plain', json);
    dispatch({
      type: 'highlight',
      pieceName: piece.name,
      x,
      y,
    });
  };

  const handleMouseOver = function handleMouseOver(e) {
    if (piece.exhausted) {
      return;
    }
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
      className={piece.exhausted ? 'piece exhausted' : 'piece not-exhausted'}
      draggable={piece.exhausted ? 'false' : 'true'}
      onDragStart={handleDragStart}
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
