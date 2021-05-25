import styled, { css } from 'styled-components';

import { MinHeightContainer, Transition } from 'utils/styles/mixins';

import * as Types from './types';

export const Label = styled.div<Types.LabelTypeProps>`
  ${(props) => {
    const { theme, isLabelType, modeViewType } = props;

    return css`
      position: relative;
      right: -8px;
      width: 300px;
      height: 32px;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      overflow: hidden;

      span {
        position: absolute;
        right: 0;
        height: 100%;
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0);
        ${Transition()}

        ${modeViewType === 'detailed'
          ? css`
              color: ${theme.colors.white};
            `
          : css`
              color: ${theme.colors.primary_1};
            `}
      }

      span:nth-child(1) {
        top: -100%;
      }

      span:nth-child(2) {
        top: 100%;
      }

      ${isLabelType
        ? css`
            span:nth-child(1) {
              top: 0;
            }
          `
        : css`
            span:nth-child(2) {
              top: 0;
            }
          `}
    `;
  }};
`;

export const Loader = styled.div`
  ${() => {
    return css`
      position: relative;
      padding: 3rem 2.5rem;
    `;
  }};
`;

export const Signals = styled.div<{ modeViewType: string }>`
  ${(props) => {
    const { theme, modeViewType } = props;

    return css`
      position: absolute;
      left: 0;
      margin-left: 3rem;

      ${modeViewType === 'simplified'
        ? css`
            color: ${theme.colors.grey_1};
          `
        : css`
            color: ${theme.colors.white};
          `}

      h3 {
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;
      }
    `;
  }};
`;

export const Main = styled.main<Types.ContainerProps>`
  ${(props) => {
    const { theme, modeViewType } = props;

    return css`
      position: relative;
      ${MinHeightContainer()};

      ${modeViewType === 'detailed'
        ? css`
            background-color: ${theme.colors.primary_2};
          `
        : css`
            background-color: ${theme.colors.white};
          `};
      ${Transition('background-color', 0.4)}
    `;
  }};
`;
