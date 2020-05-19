import React, { useContext, useState } from 'react';
import { PieceDispatchContext, SquareDispatchContext } from './Contexts';
import Piece from './Piece';
import HighlightSquare from './HighlightSquare';

const DragSquare = React.memo(({ x, y, piece, canDrop }) => {
  const dispatchPiece = useContext(PieceDispatchContext);
  const dispatchSquare = useContext(SquareDispatchContext);

  const [draggingOver, setDraggingOver] = useState(false);

  const handleDragOver = function handleDragOver(e) {
    e.preventDefault();
  };

  const handleDragEnter = function handleDragEnter(e) {
    e.preventDefault();
    setDraggingOver(true);
  };

  const handleDragLeave = function handleDragLeave(e) {
    e.preventDefault();
    setDraggingOver(false);
  };

  const handleDrop = function handleDrop(e) {
    setDraggingOver(false);
    if (canDrop === 'no') {
      dispatchSquare({
        type: 'enddrag',
      });
      return;
    }
    const piece = JSON.parse(e.dataTransfer.getData('text'));
    dispatchPiece({
      type: 'move',
      xDest: x,
      yDest: y,
      xOrg: piece.x,
      yOrg: piece.y,
      piece: piece.symbol,
    });
    dispatchSquare({
      type: 'enddrag',
    });
  };

  let squareColor = (x + y) % 2 === 0 ? 'rgb(17, 78, 17)' : 'rgb(28, 148, 28)';
  if (canDrop === 'no' && draggingOver) {
    squareColor = 'red';
  } else if (canDrop === 'yes' && !draggingOver) {
    squareColor = 'yellow';
  }

  console.count('dragsquare');
  return (
    <div
      className='square-container'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      style={{ backgroundColor: squareColor }}>
      {piece && <Piece symbol={piece} x={x} y={y} />}
      {/* {isOver && !canDrop && <HighlightSquare color='red' />}
      {!isOver && canDrop && <HighlightSquare color='yellow' />}
      {isOver && canDrop && <HighlightSquare color='green' />} */}
    </div>
  );
});

export default DragSquare;
