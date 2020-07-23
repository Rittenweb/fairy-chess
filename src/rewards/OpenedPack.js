import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Choice from './Choice';

export default function OpenedPack({ rarity, choices, clear }) {
  //Layout component doesn't work as a wrapper here, so have to implement it inside...

  let [xy, setXY] = useState([0, 0]);
  const ref = useRef(null);

  const updatePosition = function update() {
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect();
      setXY([rect.x, rect.y]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  });

  useLayoutEffect(() => {
    setTimeout(updatePosition, 100);
  }, []);

  const myClick = function myClick() {
    updatePosition();
  };

  return (
    <div
      className='pack opened'
      ref={ref}
      style={{
        backgroundPosition: `left -${xy[0]}px top -${xy[1]}px`,
      }}
      onClick={myClick}>
      {choices.map((choice, i) => (
        <Choice pieces={choice} wide={rarity === 'common'} key={i} clear={clear} />
      ))}
    </div>
  );
}
