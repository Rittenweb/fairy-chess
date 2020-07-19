export const testState = {
  gamePhase: 'start', //Can be: start, setup, inprogress, rewards, gameover, transitionstart, transitioninprogress, transitionnoboard
  enemyCaptureShown: false,
  shouldTurnEnd: false,
  benchPieces: [],
  choicesList: [],
  wave: 0,
  volume: .5,
  pieces: {
    '0': {
      '0': null,
      '1': null,
      '2': {
        name: 'queen',
        enemy: false,
        exhausted: false
      },
      '3': {
        name: 'forestmother',
        enemy: true,
        exhausted: false
      },
      '4': {
        name: 'bishop',
        enemy: false,
        exhausted: false
      },
      '5': {
        name: 'bishop',
        enemy: false,
        exhausted: false
      },
      '6': {
        name: 'shroom',
        enemy: true,
        exhausted: false
      },
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '1': {
      '0': null,
      '1': null,
      '2': null,
      '3': {
        name: 'forestmother',
        enemy: true,
        exhausted: false
      },
      '4': null,
      '5': {
        name: 'pasha',
        enemy: false,
        exhausted: false
      },
      '6': {
        name: 'bishop',
        enemy: false,
        exhausted: false
      },
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '2': {
      '0': null,
      '1': null,
      '2': null,
      '3': {
        name: 'forestmother',
        enemy: true,
        exhausted: false
      },
      '4': null,
      '5': null,
      '6': {
        name: 'bishop',
        enemy: false,
        exhausted: false
      },
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '3': {
      '0': null,
      '1': null,
      '2': null,
      '3': {
        name: 'forestmother',
        enemy: true,
        exhausted: false
      },
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '4': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': {
        name: 'knight',
        enemy: false,
        exhausted: false
      },
      '6': null,
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '5': {
      '0': null,
      '1': null,
      '2': null,
      '3': {
        name: 'queen',
        enemy: false,
        exhausted: false
      },
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': {
        name: 'shroom',
        enemy: true,
        exhausted: false
      },
      '10': null,
      '11': null,
    },
    '6': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '7': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': {
        name: 'wisp',
        enemy: false,
        exhausted: false
      },
      '10': null,
      '11': null,
    },
    '8': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': {
        name: 'threerider',
        enemy: false,
        exhausted: false
      },
      '10': null,
      '11': null,
    },
    '9': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': {
        name: 'wisp',
        enemy: 'false',
        exhausted: 'false'
      },
      '10': null,
      '11': null,
    },
    '10': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': null,
      '10': null,
      '11': null,
    },
    '11': {
      '0': null,
      '1': null,
      '2': null,
      '3': null,
      '4': null,
      '5': null,
      '6': null,
      '7': null,
      '8': null,
      '9': {
        name: 'shroom',
        enemy: true,
        exhausted: true
      },
      '10': null,
      '11': null,
    },
  },
  squares: {
    '0': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '1': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '2': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '3': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '4': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '5': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '6': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '7': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '8': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '9': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '10': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
    '11': {
      '0': {
        captureMark: false
      },
      '1': {
        captureMark: false
      },
      '2': {
        captureMark: false
      },
      '3': {
        captureMark: false
      },
      '4': {
        captureMark: false
      },
      '5': {
        captureMark: false
      },
      '6': {
        captureMark: false
      },
      '7': {
        captureMark: false
      },
      '8': {
        captureMark: false
      },
      '9': {
        captureMark: false
      },
      '10': {
        captureMark: false
      },
      '11': {
        captureMark: false
      },
    },
  },
}