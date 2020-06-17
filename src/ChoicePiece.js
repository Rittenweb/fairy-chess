import React, { useState } from 'react';
import Modal from './Modal';

export default function ChoicePiece({ name }) {
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleRightClick = function handleRightClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setModalDisplay(!modalDisplay);
  };

  return (
    <>
      <img
        className={'piece-symbol'}
        src={require(`./img/${name}.png`)}
        alt={`${name}`}
        onContextMenu={handleRightClick}
        style={{ padding: '1rem' }}></img>
      {modalDisplay && (
        <Modal piece={{ name: name }} handleClick={handleRightClick}></Modal>
      )}
    </>
  );
}
