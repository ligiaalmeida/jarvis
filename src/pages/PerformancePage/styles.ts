import styled, { css } from 'styled-components';

import { Container } from 'pages/PerformancePage/Chart/styles';
import { Elevation } from 'utils/styles/mixins';

export const customCSSInputList = css`
  margin-right: 0;
`;

export const ContentChart = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: calc(${100 / 3}% - 1.5rem);

      :nth-child(1),
      :nth-child(2),
      :nth-child(3) {
        ${theme.breakpoints.default('min').lg(css`
          width: calc(${100 / 3}% - 1.5rem);
        `)}

        ${theme.breakpoints.custom(
          'min',
          1440,
          css`
            width: calc(${100 / 3}% - 1.5rem);
          `
        )}

        ${theme.breakpoints.custom(
          'max',
          1439,
          css`
            width: 100%;
            margin-top: 2rem;
            margin-left: 0;
          `
        )}
      }

      :nth-child(1),
      :nth-child(2) {
        ${theme.breakpoints.custom(
          'max',
          1439,
          css`
            width: calc(50% - 1rem);
          `
        )}
      }

      :nth-child(2) {
        ${theme.breakpoints.custom(
          'max',
          1439,
          css`
            margin-left: 2rem;
          `
        )}
      }

      canvas {
        width: 100% !important;
      }

      + div {
        margin-left: 2rem;

        ${theme.breakpoints.default('max').md(css`
          margin-left: 1rem;
        `)}
      }
    `;
  }}
`;

export const Loader = styled.div`
  ${() => {
    return css`
      position: relative;
      padding: 3rem 2.5rem;
    `;
  }};
`;

export const Content = styled.div`
  ${() => {
    return css`
      position: relative;

      &:nth-child(2) {
        ${Container} {
          ${Elevation(2)}
        }
      }
    `;
  }};
`;

export const Main = styled.main`
  ${() => {
    return css`
      position: relative;
    `;
  }};
`;
