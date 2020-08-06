import pieceDefs from '../piecedata/pieceDefs'
import moveAlgorithms from '../piecedata/moveAlgorithms'

//Returns four distinct arrays of moveable squares for different move capabilities (sliding move, leaping move,
//move but no capture, capture but no move), so they can be displayed in different colors on the modal helper board.
//This method is also different than the above one in that it must fake an empty board.
export default function getSquareHighlights(x, y, pieceName, piecesEmpty, piecesFull) {
  //The four arrays that will be returned
  let moveSquares = [];
  let leapSquares = [];
  let moveNoCapSquares = [];
  let capNoMoveSquares = [];

  let moveTypes = [];
  let moveNoCapTypes = [];
  let capNoMoveTypes = [];

  //Define these callbacks to have access to the variables within them
  function integrateComponents(component) {
    let componentObject = pieceDefs[component];

    moveTypes = moveTypes.concat(componentObject["move"] || []);
    moveNoCapTypes = moveNoCapTypes.concat(componentObject["moveNoCap"] || []);
    capNoMoveTypes = capNoMoveTypes.concat(componentObject["capNoMove"] || []);

    //Different from getMoveableSquares: dummy piece states must be passed in, and there are four result arrays to handle
    if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
      let [tempMoveSquares, tempLeapSquares, tempMoveNoCapSquares, tempCapNoMoveSquares] = getSquareHighlights(x, y, component, piecesEmpty, piecesFull);
      moveSquares = moveSquares.concat(tempMoveSquares);
      leapSquares = leapSquares.concat(tempLeapSquares);
      moveNoCapSquares = moveNoCapSquares.concat(tempMoveNoCapSquares);
      capNoMoveSquares = capNoMoveSquares.concat(tempCapNoMoveSquares);
    }
  }

  function integrateHalfComponents(component) {
    let componentObject = pieceDefs[component];

    //Collect move algorithms
    let tempMoveTypes = componentObject["move"] || [];
    let tempMoveNoCapTypes = componentObject["moveNoCap"] || [];
    let tempCapNoMoveTypes = componentObject["capNoMove"] || [];

    //Collected algorithms are called
    tempMoveTypes.forEach((moveType) => {
      //Leaping is represented in a different color, so move types counted as leaps must be checked for
      if (moveType[0] === "leap" || moveType[0] === 'preciseLeap') {
        tempLeapSquares = tempLeapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
      } else {
        tempMoveSquares = tempMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
      }
    })

    //When no capturing is allowed, pass in an empty-board dummy piece state to the move alg
    tempMoveNoCapTypes.forEach((moveType) => {
      tempMoveNoCapSquares = tempMoveNoCapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], true, false))
    })

    //When only capturing is allowed, pass in a full-board dummy piece state to the move alg
    tempCapNoMoveTypes.forEach((moveType) => {
      tempCapNoMoveSquares = tempCapNoMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesFull, true, false, true))
    })

    //Add results to their respective arrays. Can only touch temp arrays, not the final result arrays, because we still
    //need to check that the squares are only in the front of the piece before final merging.
    if (componentObject.components || componentObject.frontComponents || componentObject.backComponents) {
      let [veryTempMoveSquares, veryTempLeapSquares, veryTempMoveNoCapSquares, veryTempCapNoMoveSquares] = getSquareHighlights(x, y, component, piecesEmpty, piecesFull);
      tempMoveSquares = tempMoveSquares.concat(veryTempMoveSquares);
      tempLeapSquares = tempLeapSquares.concat(veryTempLeapSquares);
      tempMoveNoCapSquares = tempMoveNoCapSquares.concat(veryTempMoveNoCapSquares);
      tempCapNoMoveSquares = tempCapNoMoveSquares.concat(veryTempCapNoMoveSquares);
    }
  }


  let piece = pieceDefs[pieceName];

  //Similar to the analogous stage in getMoveableSquares. Collect move algorithms for each component.
  if (piece.components) {
    let components = piece.components;
    components.forEach(integrateComponents) //Populates the arrays defined at the beginning of the method
  }

  //Similar to the analogous stage in getMoveableSquares. Collect move squares for each front component.
  if (piece.frontComponents) {
    let components = piece.frontComponents;

    var tempMoveSquares = [];
    var tempLeapSquares = [];
    var tempMoveNoCapSquares = [];
    var tempCapNoMoveSquares = [];

    components.forEach(integrateHalfComponents) //Populates above temp arrays

    //Final merging into result arrays
    moveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }));
    leapSquares = leapSquares.concat(tempLeapSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }))
    moveNoCapSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }));
    capNoMoveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] < y;
    }));
  }

  //Similar to the analogous stage in getMoveableSquares. Collect move squares for each back component.
  if (piece.backComponents) {
    let components = piece.backComponents;

    tempMoveSquares = [];
    tempLeapSquares = [];
    tempMoveNoCapSquares = [];
    tempCapNoMoveSquares = [];

    components.forEach(integrateHalfComponents) //Populates above temp arrays

    //Final merging into result arrays
    moveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }));
    leapSquares = leapSquares.concat(tempLeapSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }))
    moveNoCapSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }));
    capNoMoveSquares = moveSquares.concat(tempMoveSquares.filter((moveableSquare) => {
      return moveableSquare[1] > y;
    }));
  }

  //Collect algorithms once more, for original parent piece
  moveTypes = moveTypes.concat(pieceDefs[pieceName]["move"] || []);
  moveNoCapTypes = moveNoCapTypes.concat(pieceDefs[pieceName]["moveNoCap"] || []);
  capNoMoveTypes = capNoMoveTypes.concat(pieceDefs[pieceName]["capNoMove"] || []);

  //Call algorithms once more, and merge results into parent arrays
  moveTypes.forEach((moveType) => {
    if (moveType[0] === "leap" || moveType[0] === 'preciseLeap') {
      leapSquares = leapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
    } else {
      moveSquares = moveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], false, false))
    }
  })

  moveNoCapTypes.forEach((moveType) => {
    moveNoCapSquares = moveNoCapSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesEmpty, moveType[2], true, false))
  })

  capNoMoveTypes.forEach((moveType) => {
    capNoMoveSquares = capNoMoveSquares.concat(moveAlgorithms[moveType[0]](x, y, moveType[1], piecesFull, true, false, true))
  })

  return [moveSquares, leapSquares, moveNoCapSquares, capNoMoveSquares];
};