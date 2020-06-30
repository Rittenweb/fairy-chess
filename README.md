This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Fairy Chess

Chess has a long history of variants and home-brewed spinoffs. Traditionally, custom chess pieces with non-traditional movement are known as [fairy pieces](https://en.wikipedia.org/wiki/Fairy_chess_piece). In this game, you have randomly-given fairy pieces at your command, from a pool of nearly all the historically known and mathemetically likely piece definitions. Use them to fight back oncoming waves of mindless pawns.

### How to Play

To start the game, you'll be **randomly given a selection **of three "Common/Level 1" pieces, two "Uncommon/Level 2" pieces, and one "Rare/Level 3" piece, **which appear on your Bench**. The levels are separated by relative power. For example, pawn-like pieces are Common, knight-like pieces are Uncommon, and queen-like pieces are Rare.

**Drag your pieces onto the board** and when you can place no more pieces a "Ready" button will appear. The first three rows of the board are your starting zone.

When the game starts, pawns of different types will appear at the opposite end of the board. **Each turn, you are allowed to move all your pieces once.** Click the **"End Turn" button** when you're satisfied with your moves. Then it's the pawns' turn, and all of the pawns will move once. If you are in their capture range, they will capture you. If you lose a piece, you will never get it back.

Once you clear all pawns from the board and end your turn, you will be **taken to a bonus screen where you can choose to add pieces to your bench**--either two common pieces, an uncommon piece, or a rare piece.

**After every wave clear**, your score will go up by one and **the difficulty will increase**. This means its a bit more likely that higher-level enemy pieces will spawn--though it's ultimately random and you can get an easy or difficult board at any point.

**If you click end turn and an enemy piece is already at the last row of the board at your end, then it's GAME OVER.
**

### Tips

**Right click any piece on the board, bench, or reward screen to pop up a modal** that shows its name, level, and all its hypothetical moves. This is super important to know where your piece is capable of moving in any situation, not just from its current position. It's also vital to see which bonus piece you want to take

It is recommended to **play with Enemy Capture Squares shown**. Click the like-named button to toggle the setting. Although you can hover over enemy pieces or right click on them to see their movement just like with your own pieces, there are so many of them that you will slow down and still lose pieces by accident if you try to remember all their capture squares, and there's no going back once you end your turn.

In the bonus phase, think about which rank of your army (Common, Uncommon, or Rare) is weakest relative to its potential. There are large ranges of piece strength within each rarity rank. Your rare may be the strongest piece you have, but it might be weaker than most of the rare pieces out there, in which case you should try to get a better one. No matter how many pieces you have, you may still only deploy 3 commons, 2 uncommons, and 1 rare--the rest are left on your bench.

### Upcoming Features

Mobile play is not yet supported, as the HTML5 Drag and Drop API does not work with touch events.

The next game mechanic added will be an "auto-capture" area around some powerful pieces.

I'd like to add a couple extra animations that would be nice but would also be quite a bit of work relative to the feature payoff,
because they require additional specific game-phases and to asynchronously delay the following phase until the animation ends.

### Attributions

Josh Comeau's excellent [useSound hook](https://github.com/joshwcomeau/use-sound) made working with sounds much easier.

Icons by [Icons8](https://icons8.com/)

Gothic font by [Nomi](https://www.1001fonts.com/bitmgothic-font.html)

Music track "Puzzle Game 3" by [Eric Maytas](http://soundimage.org/)

Sound effects by [ViRiX Dreamcore (David McKee)](https://soundcloud.com/virix)

[Flower pattern template](https://www.colourlovers.com/pattern/template/16/Pattern_16) by COLOURLover
Variations on the flower pattern by these COLOURLovers users:
[candycrack](https://www.colourlovers.com/pattern/template/16/Pattern_16)
[Skyblue2u](http://www.colourlovers.com/pattern/93812/goldleaf_floral)
[Carolhue](http://www.colourlovers.com/pattern/173873/Kyoto_Duvet)
[Lady Beth](http://www.colourlovers.com/pattern/427120/Signs_of_Spring)
[kirei](http://www.colourlovers.com/pattern/1154/Fiore)
[birdfolk](http://www.colourlovers.com/pattern/133/Floral_Ribbons)
[nighthawk327](http://www.colourlovers.com/pattern/133/Floral_Ribbons)
[Mykee](http://www.colourlovers.com/pattern/735793/goodbye_flowers)
[Skyblue2u](http://www.colourlovers.com/pattern/361746/Simple_Honesty)
