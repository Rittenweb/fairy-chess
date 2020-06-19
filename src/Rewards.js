import React, { useState, useContext, useRef } from 'react';
import { getPieceWithRarity } from './pieceData';
import Pack from './Pack';

export default function Rewards({ gameState }) {
  let [selected, setSelected] = useState('all');
  let choicesList = useRef([]);

  const onClick = function onClick(whichPack) {
    setSelected(whichPack);
  };

  const clearChoices = function updateChoices(choices) {
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
      {selected === 'common' && (
        <img
          className='pack disappear'
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
        <Pack
          onClick={onClick}
          rarity={'common'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
        />
      )}
      {(selected === 'all' || selected === 'uncommon') && (
        <Pack
          onClick={onClick}
          rarity={'uncommon'}
          selected={selected}
          choices={choicesList.current}
          clear={clearChoices}
        />
      )}
      {(selected === 'all' || selected === 'rare') && (
        <Pack
          onClick={onClick}
          rarity={'rare'}
          selected={selected}
          choices={choicesList.current}
          update={clearChoices}
        />
      )}
    </div>
  );
}
