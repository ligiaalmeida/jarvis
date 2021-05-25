import styled, { css } from 'styled-components';

import { Centralized, CustomScrollBar, Elevation, Transition } from 'utils/styles/mixins';

import * as Types from './types';
import routes from '../../constants/routes';
import { multiplesOfEight } from '../../utils/styles/lib';

export const Settings = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      top: 100%;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1.5rem 0;
      background-color: ${theme.colors.white};
      border-radius: 4px;
      overflow: hidden;
      z-index: -1;
      ${Elevation(3)};
      ${Transition()};

      & .dropdown {
        span {
          padding: 0;
        }
      }

      & p {
        font-size: 14px;
        color: ${theme.colors.grey_3};
        padding: 0 8px 8px 8px;
        border-bottom: 1px solid ${theme.colors.grey_4};
      }

      > div {
        top: 0;
        padding: 0.8rem 8px;
        ${Transition('top')};

        + div {
          border-top: 1px solid ${theme.colors.grey_6};
        }

        span {
          padding-left: 0;
          text-transform: initial;
          display: inline-block;
          margin: 0 8px;
          cursor: pointer;
          color: ${theme.colors.primary_1};
          font-size: 14px;
        }
      }
    `;
  }};
`;

export const FullScreen = styled.div`
  ${() => {
    return css`
      position: relative;
      width: 100%;
      display: flex;

      span {
        top: 1px;
        margin: 0 32px;
      }
    `;
  }};
`;

export const Hour = styled.div`
  ${() => {
    return css`
      position: relative;
      height: 4rem;
      width: 8rem;
      max-width: 8rem;
      margin-left: 3rem;

      > div:nth-child(1) {
        height: 4rem;
        width: 8rem;
        max-width: 8rem;
      }
    `;
  }};
`;

export const Calendar = styled.div<Types.CalendarProps>`
  ${(props) => {
    const { theme, route = false } = props;

    return css`
      position: relative;
      width: auto;
      display: flex;
      flex-direction: column;

      label {
        display: block;
        margin-bottom: 8px;
        color: ${theme.colors.grey_1};
      }

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
          font-weight: bold;
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
        width: 100%;
      }
    `;
  }};
`;

export const InputList = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      z-index: 99;

      .nav {
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

        &__Mui-select-hour,
        &__Mui-select-building {
          & label {
            display: block;
            position: relative;
            font-size: 1.6rem;
            color: ${theme.colors.grey_1};
            margin-bottom: 8px;

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
        }

        &__pages-input {
          label {
            display: block;
            font-size: 1.6rem;
            line-height: 1;
            color: ${theme.colors.grey_1};
            margin-bottom: 8px;
          }

          &--calendar {
            width: 14rem;
            max-width: 14rem;

            &.nav__pages-input--monthly-report {
              width: 17rem;
              max-width: 17rem;
            }
          }
        }

        &__monthly-report,
        &__performance-history {
          display: flex;
          margin-left: 3rem;
        }
      }
    `;
  }};
`;

export const Brand = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavigationMobile = styled.div<{ countItems: number }>`
  ${(props) => {
    const { theme, countItems } = props;

    return css`
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      background-color: rgba(0, 0, 0, 0.5);

      .navigation {
        &__container {
          position: relative;
          width: 20%;
          min-width: 30rem;
          height: 100%;
          padding: ${multiplesOfEight(6)}rem ${theme.distance.normal}rem;
          border-right: 1px solid ${theme.colors.grey_6};
          background-color: ${theme.colors.white};
          ${Elevation(3)};
        }
      }

      header,
      section {
        position: relative;
        z-index: 1;
      }

      header {
        padding: 0 ${multiplesOfEight(2)}rem ${multiplesOfEight(5)}rem;
        margin-bottom: ${multiplesOfEight(8)}rem;
        border-bottom: 1px solid ${theme.colors.grey_6};

        img {
          width: 100%;
          height: auto;
        }
      }

      section {
        ${countItems >= 10 &&
        css`
          max-height: 68vh;
          overflow-y: auto;
          ${CustomScrollBar(theme.colors.grey_3)}
        `}

        ul {
          flex-direction: column;
          align-items: flex-start;
        }

        li {
          margin-right: 0;

          &:not(:last-child) {
            margin-bottom: ${theme.distance.small}rem;
          }
        }
      }
    `;
  }};
`;

export const HamburgerMenu = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      top: 1px;
      width: 3.2rem;
      height: 4.8rem;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        .navigation {
          &__hamburger-line {
            &--top {
              top: 6px;
            }

            &--middle {
              margin-left: -8px;
            }

            &--bottom {
              bottom: 6px;
            }
          }
        }
      }

      .navigation {
        &__hamburger-menu-content {
          position: relative;
          width: 100%;
          ${Centralized()};

          span {
            width: 100%;
            height: 4px;
            display: block;
            border-radius: 3px;
            background-color: ${theme.colors.grey_1};
            ${Transition()};
          }
        }

        &__hamburger-line {
          &--top,
          &--middle,
          &--bottom {
            position: absolute;
            border-radius: 3px;
            background-color: ${theme.colors.grey_1};
            cursor: pointer;
          }

          &--top {
            top: 8px;
          }

          &--middle {
            ${Centralized()};
            margin-left: 0;
          }

          &--bottom {
            bottom: 8px;
          }
        }
      }
    `;
  }};
`;

export const Nav = styled.nav`
  ${(props) => {
    const { theme } = props;

    return css`
      max-height: 4.8rem;
      display: flex;
      justify-content: space-between;
      background-color: ${theme.colors.grey_4};
      padding: 0 ${theme.distance.normal}rem;

      ul,
      ul + ul {
        display: flex;
        justify-content: left;
        align-items: center;

        svg {
          width: 23px;
          margin-left: ${theme.unit * 2}px;
        }
      }

      div + ul,
      ul + ul {
        li {
          a,
          span {
            :hover:after {
              background: transparent;
            }
          }
        }
      }

      & > ul + ul {
        li {
          margin-right: 0;
          align-items: center;
        }
      }
    `;
  }};
`;

export const NavItem = styled.li`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      align-items: center;
      margin-right: ${theme.unit * 6}px;
      user-select: none;
      ${Transition()};

      ${theme.breakpoints.default('min').xs`
        ${css`
          margin-right: ${theme.unit}px;
        `}
      `}

      ${theme.breakpoints.default('min').lg`
        ${css`
          margin-right: ${theme.unit * 2.5}px;
        `}
      `}

      a,
      span {
        position: relative;
        padding: 1.5rem 0;
        font-size: 1.8rem;
        font-family: 'DaimlerRegular', sans-serif;
        color: ${theme.colors.primary_1};
        text-transform: uppercase;
        text-decoration: none;
        line-height: 1;
        cursor: pointer;
        ${Transition()};

        ${theme.breakpoints.default('max').xs`
          ${css`
            font-size: 1rem;
          `}
        `}

        ${theme.breakpoints.default('max').sm`
          ${css`
            font-size: 1.1rem;
          `}
        `}

        ${theme.breakpoints.default('min').md`
          ${css`
            font-size: 1.35rem;
          `}
        `}

        ${theme.breakpoints.default('min').lg`
          ${css`
            font-size: 1.6rem;
          `}
        `}

        ${theme.breakpoints.default('min').xl`
          ${css`
            font-size: 1.8rem;
          `}
        `}

        ${theme.breakpoints.custom(
          'max',
          1440,
          css`
            font-size: 1.4rem;
          `
        )}

        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: transparent;
          ${Transition()};
        }

        &:hover,
        &.selected {
          color: #000;

          &::after {
            background: #000;
          }
        }

        &.active {
          color: #000;
          font-family: 'DaimlerBold', sans-serif;

          &:after {
            background: #000;
          }
        }
    `;
  }};
`;

export const SettingsSecondary = styled.div<Pick<Types.ContainerHeaderProps, 'modeView' | 'page'>>`
  ${(props) => {
    const { theme, modeView, page } = props;

    return css`
      position: relative;
      top: 1rem;
      right: ${theme.distance.normal}rem;
      display: flex;
      justify-content: flex-end;
      margin-bottom: -1rem;
      z-index: 1;

      > div:nth-child(1) {
        width: 42px;
        height: 42px;
        border-radius: 8px;
        border: 2px solid
          ${(page === routes.CURRENT_FAULTS || page === routes.FAULT_PREDICTION) && modeView === 'detailed'
            ? theme.colors.white
            : theme.colors.grey_3};
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        ${(page === routes.CURRENT_FAULTS || page === routes.FAULT_PREDICTION) && modeView === 'detailed'
          ? css`
              svg {
                path {
                  fill: ${theme.colors.white};
                }
              }
            `
          : css`
              svg {
                path {
                  fill: ${theme.colors.grey_3};
                }
              }
            `}
      }

      &:hover {
        svg {
          path {
            fill: ${theme.colors.primary_1};
          }
        }
      }

      > div svg {
        width: 100%;
        height: 100%;

        path {
          ${Transition('all', 0.2)}
        }
      }
    `;
  }};
`;

export const Header = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.distance.big}rem ${theme.distance.normal}rem;
      background: ${theme.colors.white};

      & > div:not(:nth-child(2)) {
        > ul {
          display: flex;

          li {
            + li {
              margin-left: 32px;
            }

            > div {
              position: relative;
              min-width: 60px;

              > * {
                font-family: 'DaimlerBold', sans-serif;
                color: #454545;
              }
            }
          }
        }
      }
    `;
  }};
`;

export const ContainerHeader = styled.header<Omit<Types.ContainerHeaderProps, 'page'>>`
  ${(props) => {
    const { theme, toggleNavigation, height } = props;

    return css`
      height: ${height}px;
      z-index: 100;
      transition: all 0.4s ease-in-out;

      ${!toggleNavigation
        ? css`
            position: relative;
          `
        : css`
            position: absolute;
            top: ${theme.distance.small + 0.4}rem;
            right: 8px;
          `}
    `;
  }}
`;
