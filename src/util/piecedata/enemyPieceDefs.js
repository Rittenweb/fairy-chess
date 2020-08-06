const enemyPieceDefs = {
  shroom: {
    move: 1,
    cap: [
      [1, 1],
      [-1, 1]
    ],
    rarity: 1
  },
  dandy: {
    move: 1,
    cap: [
      [1, 2],
      [-1, 2]
    ],
    rarity: 1
  },
  thistle: {
    move: 1,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ],
    rarity: 2
  },
  sunflower: {
    move: 2,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ],
    rarity: 2
  },
  fungi: {
    move: 2,
    cap: [
      [1, 1],
      [-1, 1],
      [0, 1],
    ],
    rarity: 2
  },
  willow: {
    move: 2,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [2, 2],
      [2, -2],
      [-2, 2],
      [-2, -2]
    ],
    rarity: 3

  },
  forestmother: {
    move: 3,
    cap: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ],
    rarity: 3
  }
}

export default enemyPieceDefs