import styled, { css } from 'styled-components';

import * as Types from 'types';

import { Centralized } from 'utils/styles/mixins';

export const KPIItem = styled.div<Types.KPIItemProps>`
  ${(props) => {
    const { theme, taktType, isBorder } = props;

    return css`
      position: relative;
      border-radius: 4px;
      padding: 2rem;
      width: 14rem;
      max-width: 14rem;
      height: 14rem;
      max-height: 14rem;
      text-align: center;
      overflow: hidden;

      > svg {
        width: 115%;
        height: 115%;
        ${Centralized()};
      }

      ${taktType === 'min' &&
      isBorder &&
      css`
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.primary_1};
      `}

      ${taktType === 'med' &&
      isBorder &&
      css`
        background-color: ${theme.colors.primary_2};
        border: 1px solid ${theme.colors.primary_1};
      `}

      ${taktType === 'max' &&
      isBorder &&
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
