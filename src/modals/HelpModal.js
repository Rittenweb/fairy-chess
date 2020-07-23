import React, { useState } from 'react';

export default function HelpModal({ gamePhase, handleClick }) {
  const [animation, setAnimation] = useState('grow 200ms ease-out');

  const animateClick = function animateClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setAnimation('shrink 200ms ease-out');
    setTimeout(() => {
      handleClick(e);
    }, 200);
  };

  let helpBanner;
  let helpText;
  //gamPhase can be: start, setup, inprogress, rewards, gameover, transitionstart, transitioninprogress, transitionnoboard
  switch (gamePhase) {
    case 'setup':
      helpBanner = 'Setup Phase';
      helpText = [
        `Your pieces are flashing on your bench, the smaller grid of squares.`,
        `Drag them onto the main board.`,
        `Press the "I'm Ready" button when you've placed your pieces.`,
        `Although you'll get more pieces on your bench, you can only deploy three commons, two uncommons, and one rare.`,
        `At any stage of the game, right click on your pieces to see their rarity (aka level) and movement possibilities.`,
      ];
      break;
    case 'inprogress':
    case 'transitioninprogress':
      helpBanner = 'Game Phase';
      helpText = [
        `Hover your pieces to see where they can move, and drag them to any moveable square.`,
        `You can move all of your pieces once per turn. Try to take all the enemy pawns.`,
        `Press the "End Turn" button when you're satisfied with your moves.`,
        `On the enemy's turn, if they can take you, they will, and you'll lose your piece forever.`,
        `If a single enemy piece reaches your end of the board, when you press "End Turn" it'll be Game Over.`,
        `Right click on your pieces or enemy pieces to see their movement possibilities.`,
        `It is recommended to play with Enemy Capture Squares shown, or else the game is much more difficult.`,
      ];
      break;
    case 'rewards':
    case 'transitionnoboard':
      helpBanner = 'Bonus Phase';
      helpText = [
        `Choose which rarity of piece you want for your bonus piece.`,
        `You'll get a choice between two pairs of pieces for Common, between two pieces for Uncommon, and just one piece for Rare.`,
        `As always, right click on the piece for more info before choosing.`,
        `Think of which rarity is currently the weakest rank of your army relative to its potential. There is a wide variety of piece strengths within each rarity.`,
        `Choose well... the difficulty is about to go up one level!`,
      ];
      break;
    default:
      helpBanner = 'Game Phase';
      helpText = [
        `Hover your pieces to see where they can move, and drag them to any moveable square.`,
        `You can move all of your pieces once per turn. Try to take all the enemy pawns.`,
        `Press the "End Turn" button when you're satisfied with your moves.`,
        `On the enemy's turn, if they can take you, they will, and you'll lose your piece forever.`,
        `If a single enemy piece reaches your end of the board, when you press "End Turn" it'll be Game Over.`,
        `Right click on your pieces or enemy pieces to see their movement possibilities.`,
        `It is recommended to play with Enemy Capture Squares shown, or else the game is much more difficult.`,
      ];
      break;
  }

  return (
    <div
      className='modal-background'
      style={{
        animation: animation,
        color: 'white',
        fontFamily: 'Cinzel Decorative, serif',
        backgroundColor: 'rgb(0, 0, 0, 0.8)',
      }}
      onClick={animateClick}
      onContextMenu={animateClick}>
      <h3>
        <b>
          <u>{helpBanner}</u>
        </b>
      </h3>
      {helpText.map((text) => {
        return <h6>{text}</h6>;
      })}
    </div>
  );
}
