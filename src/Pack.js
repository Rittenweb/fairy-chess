import React, { useState } from 'react';
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

  const myClick = function myClick() {
    onClick(rarity);
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

  return (
    <div
      className='pack'
      style={{
        backgroundColor: color,
        animation:
          selected === rarity
            ? animation + ', glow 700ms ease-in-out infinite alternate'
            : animation,
      }}
      onClick={myClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {selected === 'all' && rarity}
      {selected === 'all' && (
        <img
          className='piece-symbol'
          src={require(`./img/${rarity}.png`)}
          alt={`${rarity}`}></img>
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
