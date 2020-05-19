import React, { useContext } from 'react';
import { SquareDispatchContext } from './Contexts';

export default function Piece({ symbol, x, y }) {
  const dispatch = useContext(SquareDispatchContext);

  const handleDragStart = function handleDragStart(e) {
    const obj = { symbol, x, y };
    const json = JSON.stringify(obj);
    e.dataTransfer.setData('text/plain', json);
    dispatch({
      type: 'dragging',
      symbol,
      x,
      y,
    });
  };

  return (
    <div className='piece' draggable='true' onDragStart={handleDragStart}>
      {/* style={{ opacity: isDragging ? 0.5 : 1 }} */}
      {symbol}
    </div>
  );
}
