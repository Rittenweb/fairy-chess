import canMoveFromTo from './pieces';
import {
  initialSquareState,
} from './Constants';

export function pieceReducer(state, action) {
  switch (action.type) {
    case 'move':
      const oldX = action.xOrg;
      const oldY = action.yOrg;
      const newX = action.xDest;
      const newY = action.yDest;
      if (oldX === newX && oldY === newY) {
        return state;
      }
      let stateClone = JSON.parse(JSON.stringify(state));

      let newState = {
        ...stateClone,
        [oldX]: {
          ...stateClone[oldX],
          [oldY]: null
        },
      };
      newState = {
        ...newState,
        [newX]: {
          ...newState[newX],
          [newY]: action.piece
        },
      };
      return newState;
    case 'else':
      return {};
    default:
      throw new Error('No piece reducer for action type');
  }
}

export function squareReducer(state, action) {
  switch (action.type) {
    case 'highlight':
      let newState = JSON.parse(JSON.stringify(state));
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          if (canMoveFromTo(action.x, action.y, x, y, action.symbol)) {
            newState[x][y] = 'yes';
          } else {
            newState[x][y] = 'no'
          }
        }
      }
      console.log(newState)
      return newState;
    case 'dehighlight':
      console.log(initialSquareState);
      return initialSquareState;
    default:
      throw new Error('No square reducer for action type');
  }
}