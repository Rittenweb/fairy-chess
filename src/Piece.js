import React, { useContext } from 'react';
import { SquareDispatchContext } from './Contexts';

export default function Piece({ symbol, x, y }) {
  const dispatch = useContext(SquareDispatchContext);

  const handleDragStart = function handleDragStart(e) {
    const obj = { symbol, x, y };
    const json = JSON.stringify(obj);
    e.dataTransfer.setData('text/plain', json);
    dispatch({
      type: 'highlight',
      symbol,
      x,
      y,
    });
  };

  const handleMouseOver = function handleMouseOver(e) {
    dispatch({
      type: 'highlight',
      symbol,
      x,
      y,
    });
  };

  const handleMouseLeave = function handleMouseLeave(e) {
    dispatch({
      type: 'dehighlight',
    });
  };

  return (
    <div
      className='piece'
      draggable='true'
      onDragStart={handleDragStart}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      {symbol}
    </div>
  );
}
