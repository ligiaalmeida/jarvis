import styled, { css } from 'styled-components';
import { StyledSelect } from 'components/FormElements/Select';

import monthlyReportPage from 'constants/monthlyReportPage';
import { Transition } from 'utils/styles/mixins';

export const customCSSInputList = css`
  margin-right: 0;
`;

export const customCSSHeader = css`
  margin-bottom: 3rem;
`;

export const KPIPerStationContainer = styled.div`
  ${() => {
    // const { theme } = props;

    return css`
      position: relative;
      display: flex;

      > div:nth-child(1) {
        width: ${monthlyReportPage.COLUMN_LEFT}%;
        padding-right: 0.5rem;
      }

      > div:nth-child(2) {
        width: ${monthlyReportPage.COLUMN_RIGHT}%;
        padding-left: 0.5rem;
      }
    `;
  }};
`;

export const KPIWrapper = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;

      > h3 {
        font-size: 2.8rem;
        font-weight: normal;
        color: ${theme.colors.grey_1};
        margin-bottom: 1rem;
      }

      ${StyledSelect} {
        max-width: 24rem;
      }

      > div {
        margin-bottom: 3rem;

        select {
          background: ${theme.colors.primary_1}
            url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.65685 11.3137L11.3137 5.65686H0L5.65685 11.3137Z' fill='%23ffffff'/%3E%3C/svg%3E%0A")
            no-repeat;
          background-position-x: calc(100% - 2rem);
          background-position-y: 42%;
          color: ${theme.colors.white};
          padding: 2rem;
          border-radius: 6px;
          border: 0;

          option {
            background: ${theme.colors.white};
            color: ${theme.colors.grey_1};
            line-height: 3;

            :hover,
            :focus,
            :active,
            :checked {
              background: ${theme.colors.grey_7};
            }
          }
        }
      }
    `;
  }};
`;

export const ChartAllShift = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;

      > div {
        margin-bottom: 4rem;
      }

      > h3 {
        font-size: 2.8rem;
        font-weight: normal;
        color: ${theme.colors.grey_1};
        margin-bottom: 3rem;
      }
    `;
  }};
`;

export const General = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;

      > div:nth-child(1) {
        position: relative;
        width: ${monthlyReportPage.COLUMN_LEFT}%;
        padding-right: 0.5rem;
        display: flex;
        flex-direction: column;
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
            flex-direction: row;

            > div + div {
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

export const Title = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;

      h1 {
        font-size: 2.6rem;
        color: ${theme.colors.grey_1};
      }

      p {
        font-size: 1.8rem;
        color: ${theme.colors.grey_1};
      }
    `;
  }};
`;

export const Main = styled.main`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: ${theme.distance.normal}rem ${theme.distance.normal}rem
        ${(theme.unit * 7) / 10}rem;

      > div + div {
        margin-bottom: 3rem;
      }

      & ${General} {
        margin-bottom: 4rem;
      }
    `;
  }};
`;
