import React, { useContext, useState } from 'react';
import { DispatchContext } from '../util/Contexts';
import Modal from '../modals/Modal';

export default function BenchPiece({ piece, canDrag }) {
  const dispatch = useContext(DispatchContext);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleDragStart = function handleDragStart(e) {
    const obj = { piece, fromBench: true };
    const json = JSON.stringify(obj);
    e.dataTransfer.setData('text/plain', json);
    dispatch({
      type: 'benchHighlight',
      canDrag: canDrag,
    });
    setOpacity(0.1);
  };

  const handleDragEnd = function handleDragEnd(e) {
    dispatch({
      type: 'dehighlight',
    });
    setOpacity(1);
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
      onContextMenu={handleRightClick}
      style={{ animation: 'fadeAndShrinkIn 300ms ease-out', opacity: opacity }}>
      <img
        className={canDrag ? 'piece-symbol not-exhausted pulse' : 'piece-symbol exhausted'}
        src={require(`../img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
      {modalDisplay && <Modal piece={piece} handleClick={handleRightClick}></Modal>}
    </div>
  );
}