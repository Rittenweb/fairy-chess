import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import useSound from 'use-sound';
import openSound from '../audio/999 Get Small Item.mp3';

export default function UnopenedPack({ onClick, rarity, animation }) {
  const [play] = useSound(openSound, { volume: 0.6 });

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
    setTimeout(updatePosition, 200);
  }, []);

  const myClick = function myClick() {
    play();
    onClick(rarity);
    updatePosition();
  };

  let rarityText = '';
  let packNumText = '';
  if (rarity === 'common') {
    rarityText = 'Common';
    packNumText = '2 + 2';
  } else if (rarity === 'uncommon') {
    rarityText = 'Uncommon';
    packNumText = '1 + 1';
  } else if (rarity === 'rare') {
    rarityText = 'Rare';
    packNumText = '1';
  }

  return (
    <div
      className='pack unopened clickable'
      ref={ref}
      style={{
        backgroundPosition: `left -${xy[0]}px top -${xy[1]}px`,
        animation: animation,
      }}
      onClick={myClick}>
      <div style={{ padding: '10%' }}>{rarityText}</div>
      <div style={{ padding: '10%', fontSize: '3vw' }}>{packNumText}</div>
    </div>
  );
}
