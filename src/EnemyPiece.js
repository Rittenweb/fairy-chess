import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import EnemyModal from './EnemyModal';

export default function EnemyPiece({ piece, x, y }) {
  const dispatch = useContext(DispatchContext);
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
      draggable='false'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}
      style={{
        animation:
          piece.fade === 'out'
            ? 'fadeAndGrowOut 300ms ease-out'
            : 'fadeAndShrinkIn 300ms ease-out',
      }}>
      <img
        className='piece-symbol'
        src={require(`./img/${piece.name}.png`)}
        alt={`${piece.name}`}></img>
      {modalDisplay && (
        <EnemyModal piece={piece} handleClick={handleRightClick}></EnemyModal>
      )}
    </div>
  );
}
