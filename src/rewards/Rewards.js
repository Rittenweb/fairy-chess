import React, { useState } from 'react';
import UnopenedPack from './UnopenedPack';
import OpenedPack from './OpenedPack';

export default function Rewards({ choices }) {
  let [selected, setSelected] = useState('all');
  let [packAnimations, setPackAnimations] = useState({
    common: 'fadeIn 1500ms',
    uncommon: 'fadeIn 1500ms',
    rare: 'fadeIn 1500ms',
  });

  const onClick = function onClick(selectedPack) {
    let newAnimations = {
      common: 'fadeOutAndWait 1200ms',
      uncommon: 'fadeOutAndWait 1200ms',
      rare: 'fadeOutAndWait 1200ms',
    };
    newAnimations[selectedPack] = 'fadeOutAndGlow 1600ms linear';
    setPackAnimations(newAnimations);

    setTimeout(() => {
      setSelected(selectedPack);
    }, 1150);
  };

  return (
    <div className='rewards'>
      {selected === 'all' && <UnopenedPack rarity={'common'} onClick={onClick} animation={packAnimations.common} />}
      {selected === 'all' && <UnopenedPack rarity={'uncommon'} onClick={onClick} animation={packAnimations.uncommon} />}
      {selected === 'all' && <UnopenedPack rarity={'rare'} onClick={onClick} animation={packAnimations.rare} />}
      {selected === 'common' && <OpenedPack rarity={'common'} choices={choices} />}
      {selected === 'uncommon' && <OpenedPack rarity={'uncommon'} choices={choices} />}
      {selected === 'rare' && <OpenedPack rarity={'rare'} choices={choices} />}
    </div>
  );
}
