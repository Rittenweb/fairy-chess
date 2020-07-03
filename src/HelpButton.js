import React, { useState } from 'react';
import HelpModal from './HelpModal';

export default function HelpButton({ gamePhase }) {
  const [modalDisplay, setModalDisplay] = useState(false);

  const handleClick = function handleClick(e) {
    e.preventDefault();
    setModalDisplay(!modalDisplay);
  };

  return (
    <>
      <div
        className='attribution'
        style={{ left: 0, cursor: 'pointer' }}
        onClick={handleClick}>
        Need Help?
      </div>
      {modalDisplay && (
        <HelpModal gamePhase={gamePhase} handleClick={handleClick} />
      )}
    </>
  );
}
