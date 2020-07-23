import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

export default function TransitionLayoutComponent({ renderChild }) {
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

  return <>{renderChild(`left -${xy[0]}px top -${xy[1]}px`, ref)}</>;
}
