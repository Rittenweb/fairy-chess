import pieceDefs from '../piecedata/pieceDefs'
import moveAlgorithms from '../piecedata/moveAlgorithms'


//Return an array of static square coordinates that the piece at x and y can move to
export default function getMoveableSquares(x, y, pieceName, pieceState) {
  let moveableSquares = []; //The return value, to be populated
  let moveTypes = [];
  let moveNoCapTypes = [];
  let capNoMoveTypes = [];
  let piece = pieceDefs[pieceName];


  //Define the callbacks to be used below--they take a defined component and add its moves to the larger move array
  function integrateComponents(component) {
    let componentObject = pieceDefs[component];
    moveTypes = moveTypes.concat(componentObject["move"] || []);
    moveNoCapTypes = moveNoCapTypes.concat(componentObject["moveNoCap"] || []);
    capNoMoveTypes = capNoMoveTypes.concat(componentObject["capNoMove"] || []);

    //For each component that has its own components, recurse as deep as necessary,
    //eventually adding return arrays of component pieces to the single parent array
    if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
      moveableSquares = moveableSquares.concat(getMoveableSquares(x, y, component, pieceState));
    }
  }

  function integrateHalfComponents(component) {
    let componentObject = pieceDefs[component];

    //Move algorithms are collected
    let tempMoveTypes = componentObject["move"] || [];
    let tempMoveNoCapTypes = componentObject["moveNoCap"] || [];
    let tempCapNoMoveTypes = componentObject["capNoMove"] || [];

    //Collected algorithms are called.
    //Move type algorithms all have the same signature. They are called here with the last two arguments varying based
    //on the desired capability (move and cap, move, or cap) specficied in the component piece's definition.
    tempMoveTypes.forEach((moveType) => {
      tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
    })
    tempMoveNoCapTypes.forEach((moveType) => {
      tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
    })
    tempCapNoMoveTypes.forEach((moveType) => {
      tempMoveableSquares = tempMoveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
    })
    if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
      tempMoveableSquares = tempMoveableSquares.concat(getMoveableSquares(x, y, component, pieceState));
    }
  }


  //For each component, collect the move-square-collection algorithms into the above arrays 
  // based on their capability (move and capture, just move, or just capture)
  if (piece.components) {
    let components = piece.components;
    components.forEach(integrateComponents)
  }

  //Front components are like components, but their squares are only kept if they are ahead of the piece,
  //More technically, their y value is lower (because 0, 0 is the top left square)
  if (piece.frontComponents) {
    let components = piece.frontComponents;
    var tempMoveableSquares = [] //Let the above-defined callback access this variable
    components.forEach(integrateHalfComponents) //Populate the above array

    //Filter out all the squares that are not "front", including those recursed from components of the component
    //And then add them to the results array.
    moveableSquares = moveableSquares.concat(tempMoveableSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }))
  }

  //Back components are like components, but their squares are only kept if they are behind of the piece,
  //More technically, their y value is higher (because 0, 0 is the top left square)
  if (piece.backComponents) {
    let components = piece.backComponents;
    tempMoveableSquares = []
    components.forEach(integrateHalfComponents) //Populate the above array

    //Filter out and all the squares that are not "front", including those recursed from components of the component
    //And then add them to the results array.
    moveableSquares = moveableSquares.concat(tempMoveableSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }))
  }

  //Move algorithms are collected for the main piece (we're done with components)
  moveTypes = moveTypes.concat(pieceDefs[pieceName]["move"] || []);
  moveNoCapTypes = moveNoCapTypes.concat(pieceDefs[pieceName]["moveNoCap"] || []);
  capNoMoveTypes = capNoMoveTypes.concat(pieceDefs[pieceName]["capNoMove"] || []);

  //Collected algorithms are called.
  //Move type algorithms all have the same signature. They are called here with the last two arguments varying based
  //on the desired capability (move and cap, move, or cap) specficied in the component piece's definition.
  moveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, false))
  })
  moveNoCapTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], true, false))
  })
  capNoMoveTypes.forEach((moveType) => {
    moveableSquares = moveableSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], pieceState, moveType[2], false, true))
  })
  return moveableSquares;
};