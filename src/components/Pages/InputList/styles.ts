import styled, { css } from 'styled-components';
import { lighten } from '@material-ui/core';

import { Elevation, Transition } from 'utils/styles/mixins';

import routes from 'constants/routes';

import * as Types from './types';

export const Calendar = styled.div<Types.CalendarProps>`
  ${(props) => {
    const { theme, pathname, route = false } = props;

    return css`
      position: relative;
      width: auto;
      display: flex;
      align-items: center;

      input {
        height: 4rem;
        font-size: ${theme.typography.size.normal};
        color: ${theme.colors.grey_1};
        border-radius: ${theme.border.radius.normal};
        border: ${theme.border.size.normal} solid ${theme.colors.grey_4};
        padding: 1rem;
        ${Transition('border-color', 0.2)}

        :hover {
          border-color: ${theme.colors.primary_2};
        }

        :focus {
          outline: none;
          border-color: ${theme.colors.primary_2};
        }
      }

      .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before {
        border-bottom-color: rgba(174, 174, 174, 0.4);
      }

      .react-datepicker {
        border: 1px solid ${theme.colors.grey_5};
        font-size: 1rem;
        left: 50%;
        transform: translateX(-50%);
        ${Elevation(3)};

        ${route &&
        css`
          max-width: 150%;
          width: 110%;
        `};

        & .react-datepicker__triangle {
          left: 55% !important;
          transform: translateX(-50%);
        }

        &__month .react-datepicker__month-text {
          width: 4rem;
          margin: 8px 6px;
          padding: 4px 8px;
          font-size: 1.3rem;
          color: ${theme.colors.grey_1};
        }

        & .react-datepicker__month--disabled {
          color: ${theme.colors.grey_3};
        }

        & .react-datepicker__month--selected {
          color: ${theme.colors.white};
          background-color: ${theme.colors.primary_1};
          font-weight: bold;

          :hover {
            background-color: ${theme.colors.primary_2};
          }
        }

        &__navigation {
          background-color: transparent;
          border: none;
        }

        &__month-container {
          width: 100%;
        }

        & .react-datepicker-year-header {
          margin-bottom: 8px;
          font-size: 1.2rem;
          color: ${theme.colors.primary_1};
        }

        &__header {
          padding-top: 16px;
          background-color: ${theme.colors.grey_6};
          border-bottom: 1px solid ${theme.colors.grey_5};

          ${route &&
          css`
            padding-bottom: 16px;
          `};
        }

        &__current-month {
          margin-bottom: 8px;
          font-size: 1.2rem;
          color: ${theme.colors.primary_1};
        }

        &__navigation {
          top: 8px;
          width: 16px;
          height: auto;
          border: 0.9rem solid transparent;

          &--next,
          &--previous {
            border-width: 0.85rem;
            background-image: url("data:image/svg+xml,%3Csvg width='21' height='36' viewBox='0 0 21 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 34L18 18L2 2' stroke='%23CCCCCC' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E%0A");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            ${Transition('background-image', 0.25)}

            :hover {
              background-image: url("data:image/svg+xml,%3Csvg width='21' height='36' viewBox='0 0 21 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 34L18 18L2 2' stroke='%235097AB' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E%0A");
            }
          }

          &--previous {
            left: 12px;
            border-right-color: transparent;
            transform: rotate(180deg);

            :hover {
              border-right-color: transparent;
            }
          }

          &--next {
            right: 12px;
            border-left-color: transparent;

            :hover {
              border-left-color: transparent;
            }
          }
        }

        &__day {
          &--selected {
            background-color: ${theme.colors.primary_2};
            font-weight: bold;
          }
        }

        &__day-name,
        &__day,
        &__time-name {
          width: 2.5rem;
          line-height: 2.5rem;
          border-radius: 50%;
          margin: 0.466rem;
          ${Transition('background-color', 0.3)}

          :hover {
            border-radius: 50%;
          }
        }
      }

      .react-datepicker-popper {
        width: ${pathname === routes.PERFORMANCE_HISTORY ? '100%' : 'auto'};
      }
    `;
  }};
`;

export const Hour = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      height: 4rem;
      margin-left: ${theme.distance.normal}rem;
    `;
  }};
`;

export const Header = styled.div<Types.StyleHeaderProps>`
  ${(props) => {
    const { theme, padding, invertedElement, customCSSHeader, customCSSInputList } = props;

    return css`
      position: relative;
      display: flex;
      justify-content: ${invertedElement ? 'space-between' : 'flex-end'};
      align-items: ${invertedElement ? 'flex-start' : 'center'};
      flex-direction: ${invertedElement ? 'row-reverse' : 'reverse'};
      padding: ${padding};
      ${customCSSHeader};

      & .input-list {
        ${customCSSInputList ||
        css`
          margin-right: ${theme.distance.normal}rem;
        `}
      }
    `;
  }};
`;

export const InputList = styled.div<Types.InputListStyleProps>`
  ${(props) => {
    const { theme, page, modeView, toggleNavigation } = props;

    const inputListHideNavigationToBorderAndDistance = css`
      padding-right: ${theme.distance.normal + 0.5}rem;
      border-right: 2px solid ${theme.colors.grey_4};
    `;

    const inputListHideNavigationToDistance = css`
      padding-right: ${theme.distance.normal * 3.2}rem;
    `;

    return css`
      position: relative;
      display: flex;
      z-index: 99;

      &.input-list {
        display: flex;
        justify-content: flex-end;

        ${!toggleNavigation &&
        (page === routes.PERFORMANCE || page === routes.CURRENT_STATUS || page === routes.MIX_SUGGESTION)
          ? inputListHideNavigationToDistance
          : ''}

        .input-list__label-wrapper {
          margin: 0;

          .MuiSelect-icon {
            ${(page === routes.CURRENT_FAULTS || page === routes.FAULT_PREDICTION) && modeView === 'detailed'
              ? css`
                  color: ${theme.colors.white};
                  border-color: ${lighten(theme.colors.primary_2, 0.4)};

                  :hover {
                    border-color: ${theme.colors.primary_1};
                  }
                `
              : css`
                  color: ${theme.colors.grey_1};
                `}
          }

          .MuiSelect-select {
            ${(page === routes.CURRENT_FAULTS || page === routes.FAULT_PREDICTION) && modeView === 'detailed'
              ? css`
                  color: ${theme.colors.white};
                  border-color: ${lighten(theme.colors.primary_2, 0.4)};

                  :hover {
                    border-color: ${theme.colors.white};
                  }
                `
              : css`
                  color: ${theme.colors.grey_1};
                `}
          }

          &--building {
            ${!toggleNavigation &&
            (page === routes.PERFORMANCE || page === routes.CURRENT_STATUS || page === routes.MIX_SUGGESTION)
              ? inputListHideNavigationToBorderAndDistance
              : ''}

            ${!toggleNavigation && (page === routes.PERFORMANCE_HISTORY || page === routes.MONTHLY_REPORT)
              ? css`
                  + div {
                    ${inputListHideNavigationToDistance}

                    .input-list__input-item {
                      ${inputListHideNavigationToBorderAndDistance}
                    }
                  }
                `
              : ''}
          }
        }

        &__Mui-select-hour {
          & .MuiInput-root {
            width: 8rem;
            max-width: 8rem;
          }
        }

        &__Mui-select-building {
          width: 14rem;
          max-width: 14rem;
        }

        .input-list__label-content {
          font-size: 1.6rem;
          margin-right: 8px;

          ${(page === '/current_faults' || page === '/fault_prediction') && modeView === 'detailed'
            ? css`
                color: ${theme.colors.white};
              `
            : css`
                color: ${theme.colors.grey_1};
              `}

          &.MuiInputLabel-formControl {
            transform: none;
          }

          + .MuiInput-formControl {
            margin: 0;
          }

          &.MuiInputLabel-shrink {
            transform: none;
          }
        }

        .input-list__hour {
          width: 8rem;
          max-width: 8rem;
        }

        .input-list__input-item {
          display: flex;
          margin-left: ${theme.distance.normal}rem;

          &--calendar {
            width: 14rem;
            max-width: 14rem;

            &.input-list__input-item--monthly-report {
              width: 17rem;
              max-width: 17rem;
            }
          }
        }

        &__monthly-report,
        &__performance-history {
          display: flex;
          margin-left: ${theme.distance.normal}rem;
        }
      }
    `;
  }};
`;
