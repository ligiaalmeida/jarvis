import styled, { css } from 'styled-components';

import * as Types from './types';

export const ChartContainer = styled.div<Types.ChartContainer>`
  ${(props) => {
    const { theme, chartHeight, page } = props;

    return css`
      position: relative;
      height: 100%;
      padding-top: 16px;

      &.chart {
        .chart__content {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 32px 1fr;
          grid-gap: ${chartHeight < 400 ? '1rem' : '3rem'};
        }

        .chart__wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        &.chart--stoppage-per-station,
        &.chart--failure-per-station,
        &.chart--takt-per-station {
          .chart__monitor {
            margin-bottom: 3rem;
            max-height: 60rem;
            min-height: 40rem;
          }
        }

        .chart__monitor {
          position: relative;
          width: 100%;

          ${page === 'monthlyReport' &&
          css`
            padding-right: 2rem;
          `}
        }

        .chart__label-x-axis,
        .chart__label-y-axis {
          display: block;
          text-align: center;

          h4 {
            margin: 0;
            font-size: 1.4rem;
            color: ${theme.colors.grey_1};
          }
        }

        .chart__label-y-axis {
          position: relative;
          width: 32px;
          padding-right: 1rem;
          display: flex;
          border-right: 1px solid ${theme.colors.grey_4};

          ${page === 'performance'
            ? css`
                height: calc(100% - 100px);
              `
            : css`
                height: calc(100% - 130px);
              `}

          ${chartHeight < 500
            ? css`
                margin-right: 1rem;
              `
            : css`
                margin-right: 3rem;
              `}

          h4 {
            transform: rotate(180deg);
            writing-mode: vertical-rl;
            text-orientation: mixed;
          }
        }

        .chart__label-x-axis {
          width: calc(100% - 30px);
          border-top: 1px solid ${theme.colors.grey_4};

          ${page === 'performance'
            ? css`
                margin: 0;
              `
            : css`
                margin: 4rem 0 2rem;
              `}

          ${page === 'monthlyReport' &&
          css`
            margin-right: 2rem;
          `}

          h4 {
            padding-top: 1rem;
            width: calc(100% - 3rem);
          }
        }
      }
    `;
  }};
`;
