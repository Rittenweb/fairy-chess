import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import Square from './Square';
import HighlightSquare from './HighlightSquare';
import canMoveFromTo from './pieces';

const DragSquare = React.memo(({ x, y, piece }) => {
  const dispatch = useContext(DispatchContext);
  // const dispatchMove = () => {
  //   dispatch({
  //     type: 'move',
  //     xDest: x,
  //     yDest: y,
  //     xOrg: item.x,
  //     yOrg: item.y,
  //     piece: item.symbol,
  //   });
  // };

  // requestAnimationFrame(dispatchMove);
  // const canDrop = () => item && canMoveFromTo(item.x, item.y, x, y, item.symbol)

  const handleDragOver = function handleDragOver(e) {
    e.preventDefault();
    console.log('over');
  };

  const handleDrop = function handleDrop(e) {
    const piece = JSON.parse(e.dataTransfer.getData('text'));
    dispatch({
      type: 'move',
      xDest: x,
      yDest: y,
      xOrg: piece.x,
      yOrg: piece.y,
      piece: piece.symbol,
    });
  };

  console.count(x + ' ' + y + ' ' + piece);
  return (
    <div
      className='square-container'
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <Square piece={piece} x={x} y={y}></Square>
      {/* {isOver && !canDrop && <HighlightSquare color='red' />}
      {!isOver && canDrop && <HighlightSquare color='yellow' />}
      {isOver && canDrop && <HighlightSquare color='green' />} */}
    </div>
  );
});

export default DragSquare;
