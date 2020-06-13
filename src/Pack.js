import React, { useState, useContext } from 'react';
import { getPieceWithRarity } from './pieceData';
import Choice from './Choice';
import { DispatchContext } from './Contexts';

export default function Pack({ onClick, rarity, selected, choices }) {
  const dispatch = useContext(DispatchContext);
  let [color, setColor] = useState('rgb(17, 78, 17)');

  if (!choices.length) {
    if (rarity === 'rare') {
      choices.push([getPieceWithRarity(3).name]);
    } else if (rarity === 'uncommon') {
      choices.push([getPieceWithRarity(2).name]);
      choices.push([getPieceWithRarity(2).name]);
    } else if (rarity === 'common') {
      choices.push([getPieceWithRarity(1).name, getPieceWithRarity(1).name]);
      choices.push([getPieceWithRarity(1).name, getPieceWithRarity(1).name]);
    }
    dispatch({
      type: 'updateChoices',
      choices: choices,
    });
  }

  const myClick = function myClick() {
    console.log('pack');
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
      style={{ backgroundColor: color }}
      onClick={myClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {selected === 'all' && rarity}
      {selected === 'all' && (
        <img
          className={'piece-symbol'}
          src={require(`./img/${rarity}.png`)}
          alt={`${rarity}`}></img>
      )}
      {selected === rarity && 'Choose One!'}
      {selected === rarity &&
        choices.map((choice) => <Choice pieces={choice} />)}
    </div>
  );
}
