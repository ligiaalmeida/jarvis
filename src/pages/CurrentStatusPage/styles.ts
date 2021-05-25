import styled, { css } from 'styled-components';

import { MinHeightContainer } from 'utils/styles/mixins';

const minWidthContent = 1121;
const minHeightContent = 719;
const minWidthAndHeightStationItem = 62;

export const Loader = styled.div`
  ${() => {
    return css`
      position: relative;
      top: 4rem;
      left: 50%;
      transform: translateX(-50%);
      width: ${minWidthAndHeightStationItem * 16}px;
      height: ${minWidthAndHeightStationItem * 11}px;
      min-width: ${minWidthContent}px;
      min-height: ${minHeightContent}px;
      z-index: 1;

      svg {
        position: relative;
        right: 48px;
        top: 4px;
        width: 100%;
        height: 100%;
        fill: #cdcecf;
      }
    `;
  }};
`;

export const Signals = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: absolute;
      left: 0;
      margin-left: 3rem;
      color: ${theme.colors.grey_1};

      h3 {
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;
      }
    `;
  }};
`;

export const Main = styled.main`
  ${() => {
    return css`
      ${(props) => {
        const { theme } = props;

        return css`
          padding-bottom: ${(theme.unit * 7) / 10}rem;
          ${MinHeightContainer()};
        `;
      }}
    `;
  }};
`;
