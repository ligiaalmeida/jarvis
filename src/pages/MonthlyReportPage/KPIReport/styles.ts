import styled, { css } from 'styled-components';

import * as Types from '../types';

export const KPIItem = styled.div<Types.KPIItemProps>`
  ${(props) => {
    const { theme, taktType } = props;

    return css`
      position: relative;
      border-radius: 4px;
      padding: 2rem;
      width: 100%;
      max-width: 14rem;
      text-align: center;

      ${taktType === 'min' &&
      css`
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.primary_1};
      `}

      ${taktType === 'med' &&
      css`
        background-color: ${theme.colors.primary_2};
        border: 1px solid ${theme.colors.primary_1};
      `}

      ${taktType === 'max' &&
      css`
        background-color: ${theme.colors.primary_1};
        border: 1px solid ${theme.colors.primary_1};
      `}

      &#kpi-item-med p,
      &#kpi-item-max p,
      &#kpi-item-med span,
      &#kpi-item-max span {
        color: ${theme.colors.white};
      }

      + div {
        margin-left: 2rem;
      }

      p {
        font-size: 1.8rem;
        color: ${theme.colors.grey_1};
        font-weight: normal;
        margin-bottom: 2rem;
      }

      span {
        display: block;
        color: ${theme.colors.grey_1};

        :nth-child(2) {
          font-size: 1.8rem;
        }

        :nth-child(3) {
          font-size: 1.4rem;
        }
      }
    `;
  }};
`;

export const Container = styled.div<Types.ContainerKPIReportProps>`
  ${(props) => {
    const { theme, marginBottom } = props;

    return css`
      position: relative;

      ${marginBottom &&
      css`
        margin-bottom: ${marginBottom}rem;
      `};

      h3 {
        font-size: 1.8rem;
        color: ${theme.colors.grey_1};
        font-weight: normal;
        margin-bottom: 1rem;
      }

      > div {
        display: flex;
        flex-direction: column;
        justify-content: stretch;

        > div {
          display: flex;
          justify-content: stretch;
        }
      }
    `;
  }};
`;
