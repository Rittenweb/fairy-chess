import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

export default function TransitionLayoutComponent({
  show,
  transition,
  timeIn,
  timeOut,
  renderChild,
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const [xy, setXY] = useState([0, 0]);
  const ref = useRef(null);

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

  const onAnimationEnd = () => {
    if (!show) {
      setShouldRender(false);
    }
  };

  const update = function update() {
    console.log('ran');
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect();
      console.log(rect);
      setXY([rect.x, rect.y]);
    }
  };

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    }
  }, [show]);

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });

  useLayoutEffect(() => {
    setTimeout(update, 150);
  }, [show]);

  return (
    shouldRender && (
      <div
        style={{
          animation: `${show ? transIn : transOut} ${
            show ? timeIn : timeOut
          }ms`,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        onAnimationEnd={onAnimationEnd}>
        {renderChild(`left -${xy[0]}px top -${xy[1]}px`, ref)}
      </div>
    )
  );
}
