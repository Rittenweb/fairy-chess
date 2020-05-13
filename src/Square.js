import React, { useContext } from 'react';
import DispatchContext from './DispatchContext';

export default function Square({ dark, children }) {
  const dispatch = useContext(DispatchContext);
  const squareColor = dark ? 'rgb(17, 78, 17)' : 'rgb(28, 148, 28)';

  const handler = function handler() {
    if (dark) {
      dispatch({ type: 'move', xDest: '2', yDest: '2', piece: 'B' });
    }
  };

  return (
    <div
      className='square'
      style={{ backgroundColor: squareColor }}
      onClick={handler}>
      {children}
    </div>
  );
}
