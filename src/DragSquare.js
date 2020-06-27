import React, { useContext, useState } from 'react';
import { DispatchContext } from './Contexts';
import Piece from './Piece';
import EnemyPiece from './EnemyPiece';

const DragSquare = ({ x, y, piece, canDrop, captureMark }) => {
  const dispatch = useContext(DispatchContext);

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
      dispatch({
        type: 'dehighlight',
      });
      return;
    }
    const pieceData = JSON.parse(e.dataTransfer.getData('text'));
    if (pieceData.piece.exhausted) {
      return;
    }
    if (pieceData.bench) {
      dispatch({
        type: 'benchMove',
        xDest: x,
        yDest: y,
        piece: pieceData.piece,
      });
    } else {
      dispatch({
        type: 'move',
        xDest: x,
        yDest: y,
        xOrg: pieceData.x,
        yOrg: pieceData.y,
        piece: pieceData.piece,
      });
      dispatch({
        type: 'showEnemyCapture',
      });
    }
    dispatch({
      type: 'dehighlight',
    });
  };

  let squareColor =
    (x + y) % 2 === 0 ? 'var(--color-green)' : 'var(--color-dark)';
  if ((canDrop === 'no' && draggingOver) || canDrop === 'enemycap') {
    squareColor = 'var(--color-red)';
  } else if (canDrop === 'yes' && !draggingOver) {
    squareColor = `var(--color-light)`;
  }
  if (captureMark) {
    squareColor = `radial-gradient(${squareColor} 0%, ${squareColor} 30%, var(--color-red) 100%)`;
  }

  return (
    <div
      className='square'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      style={{
        background: squareColor,
      }}>
      {piece && piece.enemy === false && <Piece piece={piece} x={x} y={y} />}
      {piece && piece.enemy === true && (
        <EnemyPiece piece={piece} x={x} y={y} />
      )}
    </div>
  );
};

export default DragSquare;
