import styled, { css } from 'styled-components';

import { theme } from 'styles/theme';
import { Centralized, Elevation, Transition } from 'utils/styles/mixins';
import { ContentChart as ContentChartPerformance } from 'pages/PerformancePage/styles';
import { ContentChart as ContentChartHistory } from 'pages/PerformanceHistoryPage/styles';

import * as Types from './types';
import { KeysOfPagesContainingTimer } from 'types';

export const Label = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: ${theme.colors.primary_1};
      font-size: 14px;

      span:nth-child(2) {
        min-width: 75px;
        font-size: 12px;
        text-align: center;
        color: ${theme.colors.white};
        padding: 1px 1.5rem;
        border-radius: 4px;
        background-color: ${theme.colors.primary_1};
      }
    `;
  }};
`;

export const SliderContent = styled.div`
  ${() => {
    return css`
      position: relative;
      width: 100%;
      padding: 0 1rem;
    `;
  }};
`;

export const TimerContainer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;

      :hover {
        background-color: ${theme.colors.grey_6};
      }

      input {
        width: 36px;
        outline: 0;
        padding: 3px;
        border-radius: 4px;
        border: 1px solid ${theme.colors.grey_3};
        text-align: center;
        color: ${theme.colors.primary_1};

        :focus {
          border: 1px solid ${theme.colors.primary_1};
        }
      }
    `;
  }};
`;

export const SettingsDrawer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: absolute;
      top: -6px;
      right: 0;
      width: 25rem;
      padding: 1rem 0;
      border-radius: 8px;
      background-color: ${theme.colors.white};
      ${Elevation(2)};
      z-index: 1;

      > div:first-child {
        padding: 1rem 1.5rem;

        span {
          margin-left: 0;
        }
      }
    `;
  }};
`;

export const IconSettings = styled.div`
  ${() => {
    return css`
      ${Centralized()}
    `;
  }};
`;

export const Settings = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 60px;
      min-height: 5.5rem;
      margin-left: 2px;
      background-color: ${theme.colors.primary_1};
      border-radius: 8px 8px 0 0;
      padding: 1rem;
      cursor: pointer;
      ${Transition('background-color')}

      :hover {
        background-color: ${theme.colors.primary_2};
      }
    `;
  }};
`;

export const TabItem = styled.div<Types.TabItemProps>`
  ${(props) => {
    const { theme, isActive, childrenCount } = props;

    return css`
      position: relative;
      text-align: center;
      width: calc(100% / ${childrenCount});
      border-radius: 8px 8px 0 0;
      cursor: ${isActive ? 'initial' : 'pointer'};
      user-select: none;
      min-height: 5.5rem;

      & + div {
        margin-left: 2px;
      }

      h2 {
        font-family: 'DaimlerBold', sans-serif;
        font-size: 2rem;
        color: ${theme.colors.white};

        ${theme.breakpoints.default('max').md(css`
          font-size: 1.6rem;
        `)}
      }
    `;
  }};
`;

export const Tabs = styled.div<Types.TabsProps>`
  ${(props) => {
    const { minHeight } = props;

    return css`
      position: relative;
      min-height: ${`${minHeight}rem` || '10rem'};
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    `;
  }}
`;

export const Main = styled.div<Types.MainProps>`
  ${(props) => {
    const { theme, isHeightFull, padding, heightScreen } = props;
    const { inputListToPage, footer, nav_tabs } = theme.layout;

    const minHeightContent =
      heightScreen +
      inputListToPage.distance.height +
      footer.height +
      nav_tabs.header.height +
      nav_tabs.header.padding.top +
      nav_tabs.header.padding.bottom;

    return css`
      position: relative;
      width: 100%;
      height: 100%;
      background: ${theme.colors.primary_2};
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      overflow: hidden;

      ${padding
        ? css`
            padding: ${padding};
          `
        : css`
            padding: ${theme.distance.stout}rem ${theme.distance.normal}rem 6rem;
          `};

      ${theme.breakpoints.default('max').md(css`
        //height: ${isHeightFull ? 'auto' : '100%'};
      `)}

      #chart-id-0 {
        justify-content: space-between;
        position: relative;
        width: 100%;
      }

      .content-tab-faultPredictionPage,
      .content-tab-currentFaultsPage {
        min-height: calc(100vh - ${minHeightContent / 10}rem);
      }

      #chart-id-1,
      #chart-id-2,
      #chart-id-3,
      #chart-id-4,
      #chart-id-5,
      #chart-id-6 {
        justify-content: space-between;
        position: relative;
        width: 100%;
        height: auto;

        :first-child {
          ${theme.breakpoints.default('max').md(css`
            margin-bottom: 3rem;
          `)}
        }

        ${theme.breakpoints.default('max').md(css`
          width: 100%;
        `)}
      }
    `;
  }};
`;

export const Container = styled.div<{ namespace: KeysOfPagesContainingTimer }>`
  ${(props) => {
    const { namespace } = props;

    return css`
      position: relative;
      width: 100%;
      height: 100%;

      .chart__label-y-axis {
        h4 {
          height: calc(100% - 500px);
        }
      }

      > svg {
        margin-top: 5rem;
      }

      ${namespace !== 'currentFaultsPage' &&
      theme.breakpoints.default('max').md(css`
        min-height: 60rem;
      `)}

      ${ContentChartHistory},
  ${ContentChartPerformance} {
        position: relative;
        width: 100%;
        height: 100%;

        &:nth-child(2) {
          width: 100%;
          height: 100%;
        }
      }
    `;
  }}
`;
