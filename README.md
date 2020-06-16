This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Fairy Chess

Chess has a long history of variants and home-brewed spinoffs. Traditionally, custom chess pieces with non-traditional movement are known as [fairy pieces](https://en.wikipedia.org/wiki/Fairy_chess_piece). In this game, you have randomly-given fairy pieces at your command, from a pool of nearly all the historically known and mathemetically likely piece definitions. Use them to fight back oncoming waves of mindless pawns.

### How to Play

To start the game, you'll be randomly given a selection of three "Common/Level 1" pieces, two "Uncommon/Level 2" pieces, and one "Rare/Level 3" piece, which appear on your Bench. The levels are separated by relative power. For example, pawn-like pieces are Common, knight-like pieces are Uncommon, and queen-like pieces are Rare.

Choose the starting placement of your seven pieces and when you can place no more pieces a "Ready" button will appear. The first three rows of the board are your starting zone.

Pawns of different types will appear at the opposite end of the board. Each turn, you are allowed to move all your pieces once. Click the "End Turn" button when , and on the pawns' turn, all of the pawns will move once. If you are in their capture range, they will capture you. If you lose a piece, you will never get it back.

Once you clear all pawns from the board and end your turn, you will be taken to a reward screen where you can choose to add two common pieces, an uncommon piece, or a rare piece to your bench. Think about which rank of your army is weakest. There are large ranges of strength within each rarity rank. You may still only deploy 3 commons, 2 uncommons, and 1 rare--the rest are left on your bench.

After every wave clear, your score will go up by one and the difficulty will increase. This means its a bit more likely that higher-level enemy pieces will spawn--though it's ultimately random and you can get an easy or difficult board at any point.

Right click any piece on the board, bench, or reward screen to pop up a modal that shows its name, level, and all its hypothetical moves.

If you click end turn and an enemy piece is already at the last row of the board at your end, then it's game over.

It is recommended to play with Enemy Capture Squares shown. Click the like-named button to toggle the setting. Although you can hover over enemy pieces or right click on them to see their movement just like with your own pieces, there are so many of them that you will slow down and still lose pieces by accident if you try to remember all their capture squares, and there's no going back once you end your turn.

### Upcoming Features

Mobile play is not yet supported, as the HTML5 Drag and Drop API does not work with touch events.

The next game mechanic added will be an "auto-capture" area around some powerful pieces.
