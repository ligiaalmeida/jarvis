import styled, { css } from 'styled-components';
import monthlyReportPage from 'constants/monthlyReportPage';

import { Transition } from 'utils/styles/mixins';

export const KPISelectStation = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;

      & .nav {
        &__Mui-input-station {
          &--root {
            width: 24rem;
            max-width: 24rem;
          }
        }

        &__Mui-select-station {
          &--select {
            &,
            &.nav__Mui-select-station--root:focus {
              background: ${theme.colors.primary_1};
              color: ${theme.colors.white};
              padding: 1rem 2rem;
              border-radius: 6px;
            }
          }

          &--icon {
            color: ${theme.colors.white};
          }
        }
      }
    `;
  }};
`;

export const KPIPerStationContainer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      ${Transition('all', 0.25)}

      > div:nth-child(1) {
        width: ${monthlyReportPage.COLUMN_LEFT}%;
        padding-right: 0.5rem;
        ${Transition('all', 0.25)}
      }

      > div:nth-child(2) {
        width: ${monthlyReportPage.COLUMN_RIGHT}%;
        padding-left: 0.5rem;
        ${Transition('all', 0.25)}
      }

      ${theme.breakpoints.custom(
        'max',
        1250,
        css`
          flex-direction: column;
          ${Transition('all', 0.25)}

          > div:nth-child(1) {
            width: 100%;
            margin-bottom: 3rem;
          }

          > div:nth-child(1),
          > div:nth-child(2) {
            display: flex;
            flex-wrap: wrap;

            div {
              width: calc(50% - 2rem);

              > div {
                width: 100%;
              }
            }

            > div:nth-child(2),
            > div:nth-child(4),
            > div:nth-child(6),
            > div:nth-child(8) {
              margin-left: 4rem;
            }
          }

          > div:nth-child(2) {
            width: 100%;
          }
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1250,
        css`
          > div:nth-child(1) {
            width: ${monthlyReportPage.COLUMN_LEFT + 10}%;
          }

          > div:nth-child(2) {
            width: ${monthlyReportPage.COLUMN_RIGHT - 10}%;
          }
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1400,
        css`
          > div:nth-child(1) {
            width: ${monthlyReportPage.COLUMN_LEFT + 8}%;
          }

          > div:nth-child(2) {
            width: ${monthlyReportPage.COLUMN_RIGHT - 8}%;
          }
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1700,
        css`
          > div:nth-child(1) {
            width: ${monthlyReportPage.COLUMN_LEFT}%;
          }

          > div:nth-child(2) {
            width: ${monthlyReportPage.COLUMN_RIGHT}%;
          }
        `
      )}
    `;
  }};
`;
