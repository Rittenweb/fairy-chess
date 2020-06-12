import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import Modal from './Modal';

export default function BenchPiece({ piece, canDrag }) {
  const dispatch = useContext(DispatchContext);
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleDragStart = function handleDragStart(e) {
    const obj = { piece, bench: true };
    const json = JSON.stringify(obj);
    e.dataTransfer.setData('text/plain', json);
    dispatch({
      type: 'benchHighlight',
      canDrag: canDrag,
    });
  };

  const handleDragEnd = function handleDragEnd(e) {
    dispatch({
      type: 'dehighlight',
    });
  };

  const handleRightClick = function handleRightClick(e) {
    e.preventDefault();
    setModalDisplay(!modalDisplay);
    dispatch({
      type: 'dehighlight',
    });
  };

  return (
    <div
      className='piece'
      draggable={piece.canDrag ? 'true' : 'false'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onContextMenu={handleRightClick}>
      <img
        className={
          canDrag ? 'piece-symbol not-exhausted' : 'piece-symbol exhausted'
        }
        src={require(`./img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
      {modalDisplay && (
        <Modal piece={piece} handleClick={handleRightClick}></Modal>
      )}
    </div>
  );
}
