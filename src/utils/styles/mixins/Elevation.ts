import { css } from 'styled-components';

export const Elevation = (level: number) => {
  switch (level) {
    case 1:
      return css`
        box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.52);
      `;
    case 2:
      return css`
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      `;
    case 3:
      return css`
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
      `;
    case 4:
      return css`
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
      `;
    default:
      return css`
        box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.7);
      `;
  }
};
