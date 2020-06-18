import React, { useEffect, useState } from 'react';

export default function TransitionComponent({ show, children }) {
  const [shouldRender, setShouldRender] = useState(false);

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
          animation: `${show ? 'fadeIn' : 'fadeOut'} 500ms`,
          width: '100%',
        }}
        onAnimationEnd={onAnimationEnd}>
        {children}
      </div>
    )
  );
}
