import React from 'react';
import { DndItemTypes } from './DndItemTypes';
import { useDrag } from 'react-dnd';

export default function Piece({ symbol, x, y }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DndItemTypes.PIECE, symbol: symbol, x: x, y: y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className='piece' style={{ opacity: isDragging ? 0.5 : 1 }}>
      {symbol}
    </div>
  );
}
