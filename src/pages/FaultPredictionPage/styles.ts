import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

import { MinHeightContainer, Transition } from 'utils/styles/mixins';

import { LabelTypeProps } from '../CurrentFautsPage/types';
import { ContainerHeaderProps } from 'components/Navigation/types';

export const Label = styled.div<LabelTypeProps>`
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

export const SettingsPage = styled.div<ContainerHeaderProps>`
  ${(props) => {
    const { theme, toggleNavigation } = props;

    return css`
      position: relative;
      height: 60px;
      padding-right: ${toggleNavigation ? theme.distance.normal + 0.5 : 9}rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        font-family: 'DaimlerBold', sans-serif;
        font-size: 1.4rem;
        ${Transition()};
      }

      & > div:nth-child(2) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top-left-radius: 50px;
        padding: 0;
        border-bottom-left-radius: 50px;
        ${Transition()};

        div + span {
          display: block;
        }

        :hover {
          background-color: transparent;
        }
      }
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

export const Main = styled.main`
  position: relative;
  ${MinHeightContainer()};
  background-color: ${theme.colors.white};
  ${Transition('background-color', 0.4)}
`;
