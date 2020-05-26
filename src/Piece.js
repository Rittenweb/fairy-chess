import React, { useContext, useState } from 'react';
import { SquareDispatchContext } from './Contexts';
import Modal from './Modal';

export default function Piece({ piece, x, y }) {
  const dispatch = useContext(SquareDispatchContext);
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
    console.log('did');
    setModalDisplay(!modalDisplay);
  };

  return (
    <div
      className='piece'
      draggable='true'
      onDragStart={handleDragStart}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}>
      <img
        className='piece-symbol'
        src={require(`./img/${piece.symbol}.png`)}
        alt={`${piece.symbol}`}></img>
      {modalDisplay && (
        <Modal piece={piece} handleClick={handleRightClick}></Modal>
      )}
    </div>
  );
}
