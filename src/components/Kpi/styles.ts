import styled, { css } from 'styled-components';

import { Content } from 'components/Layout/Container/styles';
import { CustomScrollBar } from 'utils/styles/mixins';

import * as Types from './types';

export const KpiItem = styled.div<Types.ContentItemProps>`
  ${(props) => {
    const { theme, countItems, countCharacters } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 ${theme.unit}px;
      width: ${100 / (countItems || 13)}%;
      flex-shrink: 2;

      /* ${theme.breakpoints.custom(
        'max',
        1700,
        css`
          padding: 0 ${theme.unit * 2}px;
          width: ${countCharacters * 1.2}%;
          white-space: nowrap;
        `
      )}

      ${theme.breakpoints.default('max').md(css``)} */
    `;
  }};
`;

export const Container = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      background-color: ${theme.colors.primary_1};
      padding: ${theme.unit * 3}px 0;
      border-radius: ${theme.unit}px;
      text-align: center;
      color: ${theme.colors.white};
      overflow: hidden;

      /* ${theme.breakpoints.custom(
        'max',
        1700,
        css`
          overflow-x: auto;
        `
      )} */

      ${CustomScrollBar(theme.colors.primary_2)}

      > div + div {
        border-left: 1px solid rgba(255, 255, 255, 0.8);
      }

      > div span {
        user-select: none;
      }

      > div span:not(:last-child) {
        display: block;
        font-size: 1.6rem;
        line-height: ${theme.unit * 3}px;
        min-height: 50px;
        letter-spacing: 0;
        margin: 0;
        padding: 0;

        ${theme.breakpoints.default('max').md(css`
          min-height: 30px;
        `)}

        + span {
          font-family: 'DaimlerBold', sans-serif;
          font-size: clamp(${theme.unit * 2 + 2}px, 1.2417rem + 0.0413vw, ${theme.unit * 3}px);
        }
      }
    `;
  }};
`;

export const Wrapper = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 0 ${theme.distance.normal}rem 0;

      ${Content} {
        overflow: hidden;
      }
    `;
  }}
`;
