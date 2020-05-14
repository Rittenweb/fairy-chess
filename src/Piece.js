import React from 'react';
import { DndItemTypes } from './DndItemTypes';
import { useDrag } from 'react-dnd';

export default function Piece({ symbol }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DndItemTypes.PIECE },
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
