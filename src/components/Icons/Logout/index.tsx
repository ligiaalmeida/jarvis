import React from 'react';

import { SVGProps } from 'types';

const Logout = ({ width = '22px', height = '18px', fill = 'red' }: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 22 23"
    >
      <defs>
        <path
          d="M6.622 2.813a3.247 3.247 0 00-3.247 3.246v15.15a3.245 3.245 0 003.247 3.244h4.326a1.081 1.081 0 100-2.163H6.622a1.083 1.083 0 01-1.084-1.081V6.059c0-.597.485-1.082 1.084-1.082h4.326a1.082 1.082 0 100-2.165H6.622zm10.235 4.645a1.082 1.082 0 000 1.53l3.563 3.563H8.605a1.082 1.082 0 100 2.165v-.001H20.42l-3.563 3.563a1.081 1.081 0 000 1.53 1.08 1.08 0 001.529 0l5.411-5.41a1.081 1.081 0 000-1.53l-5.411-5.41a1.083 1.083 0 00-1.529 0z"
          id="a"
        />
      </defs>
      <g transform="translate(-3 -2)" fill="none" fillRule="evenodd">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <g mask="url(#b)" fill={fill}>
          <path d="M0 0h27v27H0z" />
        </g>
      </g>
    </svg>
  );
};

export default Logout;
