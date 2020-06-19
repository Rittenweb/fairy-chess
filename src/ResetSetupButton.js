import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';
import TransitionComponent from './TransitionComponent';

export default function ResetSetupButton({ show }) {
  const dispatch = useContext(DispatchContext);

  const resetSetup = function resetSetup(e) {
    dispatch({
      type: 'resetSetup',
    });
  };

  return (
    <TransitionComponent show={show} transition={'fade'} time={500}>
      <button className='resetsetupbutton' onClick={resetSetup}>
        Reset Setup
      </button>
    </TransitionComponent>
  );
}
