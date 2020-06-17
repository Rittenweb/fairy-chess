import React, { useState, useContext } from 'react';
import { getPieceWithRarity } from './pieceData';
import { DispatchContext } from './Contexts';
import Pack from './Pack';

export default function Rewards({ gameState }) {
  const dispatch = useContext(DispatchContext);
  let [selected, setSelected] = useState('all');

  const onClick = function onClick(whichPack) {
    setSelected(whichPack);
  };

  let choices = gameState.choicesList;

  if (!choices.length && selected !== 'all') {
    if (selected === 'rare') {
      choices.push([getPieceWithRarity(3).name]);
    } else if (selected === 'uncommon') {
      choices.push([getPieceWithRarity(2).name]);
      choices.push([getPieceWithRarity(2).name]);
    } else if (selected === 'common') {
      choices.push([getPieceWithRarity(1).name, getPieceWithRarity(1).name]);
      choices.push([getPieceWithRarity(1).name, getPieceWithRarity(1).name]);
    }
    dispatch({
      type: 'updateChoices',
      choices: choices,
    });
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
          choices={choices}
        />
      )}
      {(selected === 'all' || selected === 'uncommon') && (
        <Pack
          onClick={onClick}
          rarity={'uncommon'}
          selected={selected}
          choices={choices}
        />
      )}
      {(selected === 'all' || selected === 'rare') && (
        <Pack
          onClick={onClick}
          rarity={'rare'}
          selected={selected}
          choices={choices}
        />
      )}
    </div>
  );
}
