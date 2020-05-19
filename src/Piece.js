import React from 'react';

export default function Piece({ symbol, x, y }) {
  const handleDragStart = function handleDragStart(e) {
    const obj = { symbol, x, y };
    const json = JSON.stringify(obj);
    e.dataTransfer.setData('text/plain', json);
  };

  return (
    <div className='piece' draggable='true' onDragStart={handleDragStart}>
      {/* style={{ opacity: isDragging ? 0.5 : 1 }} */}
      {symbol}
    </div>
  );
}
