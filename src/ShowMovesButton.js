import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';
import ButtonWrapper from './ButtonWrapper';

export default function ShowMovesButton({ captureShown, show }) {
  const dispatch = useContext(DispatchContext);

  const togglemovesshown = function togglemovesshown(e) {
    if (captureShown) {
      dispatch({
        type: 'enemyCaptureOff',
      });
    } else {
      dispatch({
        type: 'enemyCaptureOn',
      });
    }
    dispatch({
      type: 'showEnemyCapture',
    });
  };

  const renderFn = function renderFn(backgroundPosition, ref) {
    return (
      <ButtonWrapper isInner={false} image='beige'>
        <ButtonWrapper isInner={true} image='black'>
          <button
            className='showmovesbutton'
            onClick={togglemovesshown}
            style={{ backgroundPosition }}
            ref={ref}>
            {captureShown && (
              <span>
                Hide Enemy<br></br>Capture Areas
              </span>
            )}
            {!captureShown && (
              <span>
                Show Enemy<br></br>Capture Areas
              </span>
            )}
          </button>
        </ButtonWrapper>
      </ButtonWrapper>
    );
  };

  return (
    <TransitionLayoutComponent
      show={show}
      transition={'fade'}
      timeIn={2000}
      timeOut={300}
      renderChild={renderFn}
    />
  );
}
