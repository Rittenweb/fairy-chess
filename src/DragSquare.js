import React, { useContext, useState } from 'react';
import { PieceDispatchContext, SquareDispatchContext } from './Contexts';
import Piece from './Piece';

//TODO: Fix persistent yellow squares when piece is dropped off board.
//Probably define all outer space as a drop zone to dispatch clean board.

const DragSquare = ({ x, y, piece, canDrop }) => {
  const dispatchPiece = useContext(PieceDispatchContext);
  const dispatchSquare = useContext(SquareDispatchContext);

  const [draggingOver, setDraggingOver] = useState(false);

  const handleDragOver = function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(true);
  };

  const handleDragLeave = function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(false);
  };

  const handleDrop = function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOver(false);
    if (canDrop === 'no') {
      dispatchSquare({
        type: 'dehighlight',
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
      type: 'dehighlight',
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
      className='square'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      style={{ backgroundColor: squareColor }}>
      {piece && <Piece symbol={piece} x={x} y={y} />}
    </div>
  );
};

export default DragSquare;
