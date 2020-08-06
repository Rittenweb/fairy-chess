import pieceDefs from '../piecedata/pieceDefs'

export default function getRarity(pieceName) {
  return pieceDefs[pieceName].rarity;
}