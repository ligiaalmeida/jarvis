import styled, { css } from 'styled-components';

import { LegendItemStyleProps } from '../../types';

export const LegendItemGroup = styled.div`
  ${() => {
    return css`
      position: relative;
      max-width: 23rem;
      display: flex;
      flex-direction: column;
    `;
  }};
`;

export const LegendItem = styled.div<LegendItemStyleProps>`
  ${(props) => {
    const { theme, type } = props;

    return css`
      position: relative;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      span {
        display: block;
        margin-left: ${theme.unit * 4}px;
        font-size: ${theme.typography.size.small};

        &:after {
          content: '';
          position: absolute;
          top: 2px;
          left: 0;
          width: 18px;
          height: 18px;
          border-radius: 2px;
        }
      }

      ${type === 'integration' &&
      css`
        span {
          &:after {
            background-color: ${theme.colors.primary_7};
            border-radius: 50%;
          }
        }
      `};

      ${type === 'operating' &&
      css`
        span {
          &:after {
            background-color: ${theme.colors.fails.default};
          }
        }
      `};

      ${type === 'empty' &&
      css`
        span {
          &:after {
            background-color: ${theme.colors.fails.empty};
          }
        }
      `};

      ${type === 'selected' &&
      css`
        span {
          &:after {
            border: 1px solid ${theme.colors.grey_1};
          }
        }
      `};

      ${type === 'disclaimer' &&
      css`
        margin-top: 1rem;

        span {
          margin-left: 0;

          &:after {
            display: none;
          }
        }
      `};
    `;
  }};
`;

export const Legends = styled.div`
  ${() => {
    return css`
      position: relative;
      display: flex;
      justify-content: flex-end;
    `;
  }};
`;
