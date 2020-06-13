import React, { useState } from 'react';
import Pack from './Pack';

export default function Rewards() {
  let [selected, setSelected] = useState('all');

  const onClick = function onClick(whichPack) {
    setSelected(whichPack);
  };

  return (
    <div className='rewards'>
      {selected === 'common' && (
        <img
          className='pack'
          src={require(`./img/${selected}.png`)}
          alt={`${selected}`}></img>
      )}
      {selected === 'uncommon' && (
        <img
          className='pack'
          src={require(`./img/${selected}.png`)}
          alt={`${selected}`}></img>
      )}
      {selected === 'rare' && (
        <img
          className='pack'
          src={require(`./img/${selected}.png`)}
          alt={`${selected}`}></img>
      )}
      {(selected === 'all' || selected === 'common') && (
        <Pack onClick={onClick} rarity={'common'} selected={selected} />
      )}
      {(selected === 'all' || selected === 'uncommon') && (
        <Pack onClick={onClick} rarity={'uncommon'} selected={selected} />
      )}
      {(selected === 'all' || selected === 'rare') && (
        <Pack onClick={onClick} rarity={'rare'} selected={selected} />
      )}
    </div>
  );
}
