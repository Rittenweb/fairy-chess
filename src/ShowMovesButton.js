import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionLayoutComponent from './TransitionLayoutComponent';
import ButtonWrapper from './ButtonWrapper';
import useSound from 'use-sound';
import selectSound from './audio/Menu1A.wav';
import deselectSound from './audio/Menu1B.wav';

export default function ShowMovesButton({ captureShown, show }) {
  const dispatch = useContext(DispatchContext);
  const [playSelect] = useSound(selectSound, { volume: 0.4 });
  const [playDeselect] = useSound(deselectSound, { volume: 0.4 });

  const togglemovesshown = function togglemovesshown(e) {
    if (captureShown) {
      playDeselect();
      dispatch({
        type: 'enemyCaptureOff',
      });
    } else {
      playSelect();
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
