import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

export default function ButtonWrapper({ isInner, image, children }) {
  const [xy, setXY] = useState([0, 0]);
  const ref = useRef(null);

  const update = function update() {
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect();
      setXY([rect.x, rect.y]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });

  useLayoutEffect(() => {
    setTimeout(update, 100);
  }, []);

  return (
    <div
      ref={ref}
      className={isInner ? 'wrapper-inner' : 'wrapper-outer'}
      style={{
        backgroundImage: `./img/flowers${image}.png`,
        backgroundPosition: `left -${xy[0]}px top -${xy[1]}px`,
      }}>
      {children}
    </div>
  );
}
