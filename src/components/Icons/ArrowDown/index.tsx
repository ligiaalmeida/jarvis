import React from 'react';

import { SVGProps } from 'types';

const ArrowDown: React.FC<SVGProps> = ({
  width = '22px',
  height = '18px',
  fill = 'red',
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 22 23"
    >
      <path
        d="M3.963 7.337a1.15 1.15 0 00-1.626 1.626l9 9a1.15 1.15 0 001.626 0l9-9a1.15 1.15 0 00-1.626-1.626l-8.187 8.187-8.187-8.187z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowDown;
