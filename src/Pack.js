import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Choice from './Choice';

export default function Pack({
  onClick,
  rarity,
  selected,
  choices,
  clear,
  animation,
}) {
  let [color, setColor] = useState('rgb(17, 78, 17)');
  let [xy, setXY] = useState([0, 0]);
  const ref = useRef(null);

  const update = function update() {
    console.log('ran');
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect();
      console.log(rect);
      setXY([rect.x, rect.y]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });

  useLayoutEffect(() => {
    setTimeout(update, 200);
  }, []);

  const myClick = function myClick() {
    onClick(rarity);
    update();
  };

  const handleMouseLeave = function handleMouseLeave(e) {
    if (selected === 'all') {
      setColor('rgb(17, 78, 17)');
    }
  };

  const handleMouseEnter = function handleMouseEnter(e) {
    if (selected === 'all') {
      setColor('rgb(28, 148, 28)');
    }
  };

  let packNumText = '';
  if (rarity === 'common') {
    packNumText = '2 + 2';
  } else if (rarity === 'uncommon') {
    packNumText = '1 + 1';
  } else if (rarity === 'rare') {
    packNumText = '1';
  }

  return (
    <div
      className='pack'
      ref={ref}
      style={{
        backgroundColor: color,
        backgroundPosition: `left -${xy[0]}px top -${xy[1]}px`,
        animation:
          selected === rarity
            ? animation + ', glow 700ms ease-in-out infinite alternate'
            : animation,
      }}
      onClick={myClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {selected === 'all' && <div style={{ padding: '10%' }}>{rarity}</div>}
      {selected === 'all' && (
        <div style={{ padding: '10%' }}>{packNumText}</div>
      )}
      {selected === rarity && 'Choose One!'}
      {selected === rarity &&
        choices.map((choice, i) => (
          <Choice
            pieces={choice}
            wide={rarity === 'common'}
            key={i}
            clear={clear}
          />
        ))}
    </div>
  );
}
