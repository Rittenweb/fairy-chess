import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import { useDrop } from 'react-dnd';
import { DndItemTypes } from './DndItemTypes';
import Square from './Square';
import HighlightSquare from './HighlightSquare';
import canMoveFromTo from './pieces';

const DragSquare = React.memo(({ x, y, piece }) => {
  const dispatch = useContext(DispatchContext);
  const dispatchMove = () => {
    dispatch({
      type: 'move',
      xDest: x,
      yDest: y,
      xOrg: item.x,
      yOrg: item.y,
      piece: item.symbol,
    });
  };

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: DndItemTypes.PIECE,
    drop: () => {
      requestAnimationFrame(dispatchMove);
    },
    canDrop: () => item && canMoveFromTo(item.x, item.y, x, y, item.symbol),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  console.count(x + ' ' + y + ' ' + piece);
  return (
    <div ref={drop} className='square-container'>
      <Square piece={piece} x={x} y={y}></Square>
      {isOver && !canDrop && <HighlightSquare color='red' />}
      {!isOver && canDrop && <HighlightSquare color='yellow' />}
      {isOver && canDrop && <HighlightSquare color='green' />}
    </div>
  );
});

export default DragSquare;
