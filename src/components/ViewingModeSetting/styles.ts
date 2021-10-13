import styled, { css } from 'styled-components';
import { Transition } from 'utils/styles/mixins';

import routes from 'constants/routes';

import * as Types from './types';

export const SettingsPage = styled.div<Types.SettingsPageProps>`
  ${(props) => {
    const { theme, modeViewType, toggleNavigation, isLabelType, pathname } =
      props;

    return css`
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      ${!toggleNavigation &&
      (pathname === routes.CURRENT_FAULTS ||
        pathname === routes.FAULT_PREDICTION)
        ? css`
            padding-right: ${theme.distance.normal * 3.2}rem;
          `
        : css`
            padding-right: ${modeViewType === 'detailed' ? '1rem' : 0};
          `}

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

      & .mode-view__row {
        padding-top: 0;

        & .mode-view__simplified + .mode-view__label,
        & .mode-view__detailed {
          margin-right: 0;
        }
      }

      & .mode-view__label .mode-view__radio {
        &:hover {
          background-color: rgba(0, 103, 127, 0.06);
        }
      }

      .MuiFormControlLabel-label {
        color: ${theme.colors.white};
      }

      ${modeViewType === 'simplified' &&
      !toggleNavigation &&
      css`
        & .mode-view__row {
          padding-right: ${theme.distance.normal}rem;
          border-right: 1px solid ${theme.colors.grey_2};
          ${Transition()}
        }
      `}

      ${modeViewType === 'detailed' &&
      !toggleNavigation &&
      css`
        & .mode-view__row {
          padding-right: ${theme.distance.normal}rem;
          border-right: 1px solid rgba(255, 255, 255, 0.6);
        }
      `}

      ${modeViewType === 'detailed' &&
      css`
        & .mode-view__label .mode-view__radio {
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }

        & .mode-view__label .mode-view__radio .MuiIconButton-label {
          color: ${theme.colors.white};
        }

        & .mode-view__label .mode-view__radio .MuiTouchRipple-root {
          color: ${theme.colors.white};
        }
      `}

      ${modeViewType === 'simplified' &&
      css`
        & .mode-view__label .mode-view__radio {
          &:hover {
            background-color: rgba(0, 103, 127, 0.06);
          }
        }

        & .mode-view__label .mode-view__radio .MuiIconButton-label {
          color: ${theme.colors.primary_1};
        }

        & .mode-view__label .mode-view__radio .MuiTouchRipple-root {
          color: ${theme.colors.primary_1};
        }
      `}

      ${modeViewType === 'simplified' &&
      css`
        & .Mui-checked {
          color: ${theme.colors.primary_1};
        }
      `}

      ${isLabelType &&
      modeViewType === 'simplified' &&
      css`
        & .mode-view__label:nth-child(1) .MuiFormControlLabel-label {
          color: ${theme.colors.primary_1};
        }
        & .mode-view__label:nth-child(2) .MuiFormControlLabel-label {
          color: ${theme.colors.grey_2};
        }
      `}
    `;
  }};
`;
