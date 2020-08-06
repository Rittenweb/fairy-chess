import MAX_MOVE from '../piecedata/maxMove'
import enemyPieceDefs from '../piecedata/enemyPieceDefs'

//Pass in the board's pieceState, and return a new pieceState that has
//been populated with enemy-representative objects for the game's start. 
export default function randomizeEnemies(pieceState, difficulty) {

  //Each index corresponds to a column of the board: there will be one enemy on each column
  for (let i = 0; i < MAX_MOVE; i++) {
    //Each piece will be either 0, 1, or 2 spaces away from the opposite side of the board
    let y = Math.floor(Math.random() * 3);
    //Twelve discrete values, representing how many of the twelve pieces should be that rarity
    let rarityWeighted = Math.floor(Math.random() * 12);
    let rarity; //The rarity to fetch: 1, 2, or 3
    //Each round, difficulty gets higher, so each round, there is a smaller range that can be rarity-1 pieces
    //To begin: 8 out of 12 pieces on average should be rarity 1
    if (rarityWeighted <= 7 - difficulty) {
      rarity = 1;
    }
    //To begin: 3 out of 12 pieces on average should be rarity 2
    else if (rarityWeighted <= 10 - difficulty) {
      rarity = 2;
    }
    //To begin: 1 out of twelve pieces (at value 11) should be rarity 3
    else {
      rarity = 3;
    }
    let enemyNames = Object.keys(enemyPieceDefs);
    let enemyName = enemyNames[Math.floor(enemyNames.length * Math.random())];
    while (enemyPieceDefs[enemyName].rarity !== rarity) {
      enemyName = enemyNames[Math.floor(enemyNames.length * Math.random())];
    }
    pieceState[i] = {
      ...pieceState[i],
      [y]: {
        name: enemyName,
        enemy: true,
        exhausted: false
      }
    }
  }
  return pieceState;
}