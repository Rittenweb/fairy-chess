import React, { useEffect, useState } from 'react';

export default function TransitionComponent({ show, children, transition, timeIn, timeOut }) {
  const [shouldRender, setShouldRender] = useState(false);

  let transIn;
  let transOut;
  switch (transition) {
    case 'fade':
      transIn = 'fadeIn';
      transOut = 'fadeOut';
      break;
    case 'shrink':
      transIn = 'shrink';
      transOut = 'grow';
      break;
    case 'slideDown':
      transIn = 'slideDownIn';
      transOut = 'slideDownOut';
      break;
    case 'slideUp':
      transIn = 'slideUpIn';
      transOut = 'slideUpOut';
      break;
    case 'collapse':
      transIn = 'collapseIn';
      transOut = 'collapseOut';
      break;
    default:
      transIn = 'fadeIn';
      transOut = 'fadeOut';
      break;
  }

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    }
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) {
      setShouldRender(false);
    }
  };

  return (
    shouldRender && (
      <div
        className='transition-wrapper'
        style={{
          animation: `${show ? transIn : transOut} ${show ? timeIn : timeOut}ms`,
        }}
        onAnimationEnd={onAnimationEnd}>
        {children}
      </div>
    )
  );
}
