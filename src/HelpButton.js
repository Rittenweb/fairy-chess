import React, { useState } from 'react';
import HelpModal from './modals/HelpModal';

export default function HelpButton({ gamePhase }) {
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleClick = function handleClick(e) {
    e.preventDefault();
    setModalDisplay(!modalDisplay);
  };

  return (
    <>
      <div className='corner-button corner-left' onClick={handleClick}>
        Need Help?
      </div>
      {modalDisplay && <HelpModal gamePhase={gamePhase} handleClick={handleClick} />}
    </>
  );
}
