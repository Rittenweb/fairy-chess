import React, { useContext } from 'react';
import { DispatchContext } from './Contexts';

export default function ResetSetupButton() {
  const dispatch = useContext(DispatchContext);

  const resetSetup = function resetSetup(e) {
    dispatch({
      type: 'resetSetup',
    });
  };

  return (
    <button className='resetsetupbutton' onClick={resetSetup}>
      Reset Setup
    </button>
  );
}
