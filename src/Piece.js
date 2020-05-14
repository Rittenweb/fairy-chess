import React from 'react';
import { DndItemTypes } from './DndItemTypes';
import { useDrag, DragPreviewImage } from 'react-dnd';

export default function Piece({ symbol, x, y }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DndItemTypes.PIECE, symbol: symbol, x: x, y: y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={require('./acorn.svg')} />
      <div
        ref={drag}
        className='piece'
        style={{ opacity: isDragging ? 0.5 : 1 }}>
        {symbol}
      </div>
    </>
  );
}
