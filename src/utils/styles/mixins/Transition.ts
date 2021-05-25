import { css } from 'styled-components';

export const Transition = (elements = 'all', duration = 0.4) => {
  const transition = elements
    .replace(/(\s+)/, '')
    .split(',')
    .reduce((acc, el) => {
      acc += ` ${el} ${duration}s ease-in-out, `;
      return acc;
    }, '');

  return css`
    transition: ${[...transition].slice(0, -2)};
  `;
};
