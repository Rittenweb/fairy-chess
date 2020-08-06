import pieceDefs from '../piecedata/pieceDefs'

//Returns a piece-representative object with three properties:
//Its NAME is randomly chosen from all names that match the specified rarity
//Its ENEMY is set to false, because this method is used for ally bench population
//Its ID is set to the parameter-specified id, so that the bench pieces stay in order
export default function getPieceWithRarity(rarity, id) {
  let pieceNames = Object.keys(pieceDefs);
  let pieceName = pieceNames[Math.floor(pieceNames.length * Math.random())];
  //It is slower on average to iterate through the pieceDefs object and separate it by rarity
  //than just hope we get the right rarity within a few attempts
  while (pieceDefs[pieceName].rarity !== rarity) {
    pieceName = pieceNames[Math.floor(pieceNames.length * Math.random())];
  }
  return {
    name: pieceName,
    enemy: false,
    id: id
  };
}