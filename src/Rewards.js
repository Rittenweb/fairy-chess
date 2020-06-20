import React, { useState, useRef } from 'react';
import { getPieceWithRarity } from './pieceData';
import Pack from './Pack';

export default function Rewards() {
  let [selected, setSelected] = useState('all');
  let [animation, setAnimation] = useState('fadeIn 700ms');
  let choicesList = useRef([]);

  const onClick = function onClick(whichPack) {
    if (whichPack !== selected) {
      setAnimation('fadeOut 700ms');
      setTimeout(() => {
        setSelected(whichPack);
      }, 700);
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
          animation={animation}
        />
      )}
      {(selected === 'all' || selected === 'uncommon') && (
        <Pack
          onClick={onClick}
          rarity={'uncommon'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
          animation={animation}
        />
      )}
      {(selected === 'all' || selected === 'rare') && (
        <Pack
          onClick={onClick}
          rarity={'rare'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
          animation={animation}
        />
      )}
    </div>
  );
}
