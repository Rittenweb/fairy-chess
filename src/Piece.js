import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import Modal from './Modal';
import useSound from 'use-sound';
import highlightSound from './audio/sharp_echo.wav';

export default function Piece({ piece, x, y }) {
  const dispatch = useContext(DispatchContext);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [play] = useSound(highlightSound, { volume: 0.2 });

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
    setOpacity(0.1);
  };

  const handleDragEnd = function handleDragEnd(e) {
    setOpacity(1);
  };

  const handleMouseOver = function handleMouseOver(e) {
    if (piece.exhausted) {
      return;
    }
    play();
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
    dispatch({
      type: 'dehighlight',
    });
  };

  return (
    <div
      className='piece'
      draggable={piece.exhausted ? 'false' : 'true'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}
      style={{ opacity: opacity }}>
      <img
        className={
          piece.exhausted
            ? 'piece-symbol exhausted'
            : 'piece-symbol not-exhausted'
        }
        src={require(`./img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
      {modalDisplay && (
        <Modal piece={piece} handleClick={handleRightClick}></Modal>
      )}
    </div>
  );
}
