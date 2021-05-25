import { css } from 'styled-components';

export const CustomScrollBar = (colorThumb: string, isHover = true) => {
  return css`
    /* width */
    &::-webkit-scrollbar {
      width: 14px;
      height: 14px;
      padding: 0 1rem;
      background: transparent;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 16px;
      border: solid 3px transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      border: solid 3px transparent;
      opacity: 0;
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    ${isHover
      ? css`
          /* Handle on hover */
          &:hover {
            &::-webkit-scrollbar-thumb {
              opacity: 1;
              box-shadow: inset 0 0 10px 10px ${colorThumb};
            }
          }
        `
      : css`
          /* Handle on hover */
          &::-webkit-scrollbar-thumb {
            opacity: 1;
            box-shadow: inset 0 0 10px 10px ${colorThumb};
          }
        `}
  `;
};
