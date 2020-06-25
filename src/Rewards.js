import React, { useState, useRef } from 'react';
import { getPieceWithRarity } from './pieceData';
import UnopenedPack from './UnopenedPack';
import OpenedPack from './OpenedPack';

export default function Rewards() {
  let [selected, setSelected] = useState('all');
  let [animations, setAnimations] = useState({
    common: 'fadeIn 1500ms',
    uncommon: 'fadeIn 1500ms',
    rare: 'fadeIn 1500ms',
  });
  let choicesList = useRef([]);

  const onClick = function onClick(whichPack) {
    let newAnimations = {
      common: 'fadeOutAndWait 1200ms',
      uncommon: 'fadeOutAndWait 1200ms',
      rare: 'fadeOutAndWait 1200ms',
    };
    newAnimations[whichPack] = 'fadeOutAndGlow 1600ms linear';
    setAnimations(newAnimations);

    setTimeout(() => {
      setSelected(whichPack);
    }, 1150);
  };

  const clearChoices = function clearChoices() {
    choicesList.current = [];
  };

  if (!choicesList.current.length && selected !== 'all') {
    if (selected === 'rare') {
      choicesList.current.push([getPieceWithRarity(3).name]);
    } else if (selected === 'uncommon') {
      choicesList.current.push([getPieceWithRarity(2).name]);
      choicesList.current.push([getPieceWithRarity(2).name]);
    } else if (selected === 'common') {
      choicesList.current.push([
        getPieceWithRarity(1).name,
        getPieceWithRarity(1).name,
      ]);
      choicesList.current.push([
        getPieceWithRarity(1).name,
        getPieceWithRarity(1).name,
      ]);
    }
  }

  return (
    <div className='rewards'>
      {selected === 'all' && (
        <UnopenedPack
          rarity={'common'}
          onClick={onClick}
          animation={animations.common}
        />
      )}
      {selected === 'all' && (
        <UnopenedPack
          rarity={'uncommon'}
          onClick={onClick}
          animation={animations.uncommon}
        />
      )}
      {selected === 'all' && (
        <UnopenedPack
          rarity={'rare'}
          onClick={onClick}
          animation={animations.rare}
        />
      )}
      {selected === 'common' && (
        <OpenedPack
          rarity={'common'}
          choices={choicesList.current}
          clear={clearChoices}
        />
      )}
      {selected === 'uncommon' && (
        <OpenedPack
          rarity={'uncommon'}
          choices={choicesList.current}
          clear={clearChoices}
        />
      )}
      {selected === 'rare' && (
        <OpenedPack
          rarity={'rare'}
          choices={choicesList.current}
          clear={clearChoices}
        />
      )}
    </div>
  );
}
