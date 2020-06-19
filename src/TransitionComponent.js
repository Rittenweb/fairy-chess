import React, { useEffect, useState } from 'react';

export default function TransitionComponent({
  show,
  children,
  transition,
  time,
}) {
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
    default:
      transIn = 'fadeIn';
      transOut = 'fadeOut';
      break;
  }

  useEffect(() => {
    if (show) setShouldRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setShouldRender(false);
  };

  return (
    shouldRender && (
      <div
        style={{
          animation: `${show ? transIn : transOut} ${time}ms`,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        onAnimationEnd={onAnimationEnd}>
        {children}
      </div>
    )
  );
}
