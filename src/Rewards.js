import React, { useState, useRef } from 'react';
import { getPieceWithRarity } from './pieceData';
import Pack from './Pack';

export default function Rewards() {
  let [selected, setSelected] = useState('all');
  let [animations, setAnimations] = useState({
    common: 'fadeIn 700ms',
    uncommon: 'fadeIn 700ms',
    rare: 'fadeIn 700ms',
  });
  let choicesList = useRef([]);

  const onClick = function onClick(whichPack) {
    if (whichPack !== selected) {
      let newAnimations = {
        common: 'fadeOutAndWait 1200ms',
        uncommon: 'fadeOutAndWait 1200ms',
        rare: 'fadeOutAndWait 1200ms',
      };
      newAnimations[whichPack] = 'flipShrinkAndGlow 1200ms linear';
      setAnimations(newAnimations);

      setTimeout(() => {
        setSelected(whichPack);
      }, 1150);
    }
  };

  const clearChoices = function updateChoices() {
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
      {(selected === 'all' || selected === 'common') && (
        <Pack
          onClick={onClick}
          rarity={'common'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
          animation={
            selected === 'common'
              ? 'flipAndGrow 400ms ease-out'
              : animations.common
          }
        />
      )}
      {(selected === 'all' || selected === 'uncommon') && (
        <Pack
          onClick={onClick}
          rarity={'uncommon'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
          animation={
            selected === 'uncommon'
              ? 'flipAndGrow 400ms ease-out'
              : animations.uncommon
          }
        />
      )}
      {(selected === 'all' || selected === 'rare') && (
        <Pack
          onClick={onClick}
          rarity={'rare'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
          animation={
            selected === 'rare' ? 'flipAndGrow 400ms ease-out' : animations.rare
          }
        />
      )}
    </div>
  );
}
