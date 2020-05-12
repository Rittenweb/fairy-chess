import React, { useState } from 'react';

export default function Square(props) {
  let [content, setContent] = useState(props.coords[0] + 0 + props.coords[1]);
  const handler = () => {
    setContent(content + '+');
  };
  return (
    <div className='square' onClick={handler}>
      {content}
    </div>
  );
}
