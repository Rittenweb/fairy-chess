export function pieceReducer(state, action) {
  switch (action.type) {
    case 'move':
      const oldX = action.xOrg;
      const oldY = action.yOrg;
      const newX = action.xDest;
      const newY = action.yDest;
      if (oldX === newX && oldY === newY) {
        return {
          ...state
        };
      }
      let newState = {
        ...state,
        [oldX]: {
          ...state[oldX],
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
    case 'dragging':
      return {}
      default:
        throw new Error('No square reducer for action type');
  }
}