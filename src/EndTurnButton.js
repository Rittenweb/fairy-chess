import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import { DispatchContext } from './Contexts';

export default function EndTurnButton() {
  const dispatch = useContext(DispatchContext);
  const [xy, setXY] = useState([0, 0]);
  const ref = useRef(null);

  const endTurn = function endTurn(e) {
    dispatch({ type: 'transitioninprogress' });
    setTimeout(() => {
      dispatch({ type: 'endTurn' });
      dispatch({ type: 'showEnemyCapture' });
    }, 300);
  };

  const update = function update() {
    if (ref.current) {
      console.log('ran');
      let rect = ref.current.getBoundingClientRect();
      setXY([rect.x, rect.y]);
    }
  };

  useLayoutEffect(() => {
    setTimeout(update, 100);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <button
      ref={ref}
      className='endturnbutton'
      onClick={endTurn}
      style={{
        backgroundPosition: `left -${xy[0]}px top -${xy[1]}px`,
      }}></button>
  );
}
