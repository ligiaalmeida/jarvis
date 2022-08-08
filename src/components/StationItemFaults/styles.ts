import routes from 'constants/routes';
import styled, { css } from 'styled-components';

import {
  CustomScrollBar,
  Elevation,
  Transition,
  Centralized,
} from 'utils/styles/mixins';

import * as Types from './types';

export const Footer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      text-align: center;
      height: 100%;
      grid-row-start: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${theme.colors.white};
      width: 100%;
      span {
        font-family: 'DaimlerBold', sans-serif;
        font-size: 14px;
        color: ${theme.colors.grey_2};
      }
    `;
  }};
`;

export const FailItem = styled.span<Types.FailItemProps>`
  ${(props) => {
    const { color } = props;

    return css`
      position: relative;
      background-color: ${color};
      clear: both;
    `;
  }};
`;

export const FailLabel = styled.span`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 !important;
  position: relative;
  flex-wrap: nowrap;
  align-items: baseline;
  & > span {
    padding: 0 !important;
    margin: 0 !important;
  }
`;

export const FailList = styled.div<Types.FailListProps>`
  ${(props) => {
    const { theme, from } = props;

    return css`
      position: relative;
      height: 100%;
      display: flex;
      grid-row-start: 2;
      flex-direction: column;
      padding-top: 4px;
      overflow-y: auto;
      background-color: ${theme.colors.white};
      ${CustomScrollBar(theme.colors.grey_3)};

      ${theme.breakpoints.custom(
        'max',
        1440,
        css`
          overflow-y: auto;
        `
      )}

      span {
        font-family: 'DaimlerBold', sans-serif;
        font-size: 14px;
        border-radius: 16px;
        padding: 2px ${theme.unit * 2}px;
        margin-bottom: 5px;
        color: ${from === routes.FAULT_PREDICTION
          ? theme.colors.black
          : theme.colors.white};

        &:last-child {
          margin-bottom: 0;
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
      height: 100%;
      grid-row-start: 1;

      p {
        font-size: ${theme.unit * 2}px;
        color: ${theme.colors.primary_1};
        text-align: right;
      }
    `;
  }};
`;

export const Wrapper = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      display: grid;
      grid-template-rows: 0.2fr 1fr 0.23fr;
      margin: auto;
      padding: 6px;
      border-radius: ${theme.unit}px;
      background-color: ${theme.colors.white};
      ${Elevation(3)};
      ${Centralized()};
    `;
  }};
`;

export const StationItemFaultsContainer = styled.div<Types.StationItemFaultsContainer>`
  ${(props) => {
    const {
      theme,
      heightScreen,
      isNavigation,
      width,
      typeView,
      countRows,
      isSelected,
    } = props;
    const { inputListToPage, footer, nav_tabs } = theme.layout;

    const minHeightContent =
      (isNavigation ? 0 : heightScreen) +
      inputListToPage.distance.height +
      footer.height +
      nav_tabs.header.height +
      nav_tabs.header.padding.top +
      nav_tabs.header.padding.bottom;

    return css`
      position: relative;
      width: ${width ? `${width}rem` : 'calc(100% / 7)'};
      min-width: 18rem;
      max-height: 30rem;
      margin: ${theme.unit}px;

      :before {
        content: '';
        position: absolute;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        border-radius: 10px;
        background-color: rgba(86, 229, 1, 0);
        ${Centralized()}
        ${Transition('background-color', 0.25)}
      }

      :after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background-color: rgba(86, 229, 1, 0);
        ${Transition('background-color', 0.25)};
        z-index: -1;
      }

      ${isSelected &&
      css`
        :before {
          background-color: #56e501;
        }

        :after {
          background-color: #56e501;
        }
      `};

      ${typeView === 'simplified' &&
      css`
        @media (min-height: 0) {
          height: calc(((100vh - ${minHeightContent / 12}rem) / 3.1));
        }

        @media (min-height: 900px) {
          height: calc(((100vh - ${minHeightContent / 10}rem) / ${countRows}));
        }
      `}

      ${theme.breakpoints.default('max').md(css`
        height: 22rem;
      `)}

      ${theme.breakpoints.custom(
        'min',
        0,
        css`
          width: calc(100% / 1);
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        600,
        css`
          width: calc(100% / 4);
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1050,
        css`
          width: calc(100% / 5);
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1280,
        css`
          width: ${typeView === 'simplified'
            ? 'calc(100% / 7)'
            : 'calc(100% / 5)'};
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1300,
        css`
          width: calc(100% / 7);
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1670,
        css`
          width: calc(100% / 7);
        `
      )}

      ${theme.breakpoints.custom(
        'min',
        1921,
        css`
          width: calc(100% / 10);
        `
      )}

      ${Transition('width', 0.3)};

      & * {
        user-select: none;
      }
    `;
  }};
`;
