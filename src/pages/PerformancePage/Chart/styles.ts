import styled, { css } from 'styled-components';
import { FormGroup as MuiFormGroup } from '@material-ui/core';

import { Elevation, Transition } from 'utils/styles/mixins';
import { EChartList } from 'enums/chartList';

import * as Types from '../types';

export const Margin = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      margin: ${theme.unit}px;
    `;
  }}
`;

export const Container = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      height: 100%;
      padding: ${theme.distance.normal}rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      background: ${theme.colors.white};
      border-radius: 8px;
      ${Elevation(3)}
    `;
  }};
`;

export const HeaderContainer = styled.div`
  ${() => {
    return css`
      position: relative;
      min-height: 70px;
    `;
  }};
`;

export const ChartViewButtons = styled.div<Types.ChartViewButtonsProps>`
  ${(props) => {
    const { theme, selected = 1 } = props;

    return css`
      position: relative;
      width: fit-content;
      display: flex;
      font-size: 1.6rem;
      color: ${theme.colors.grey_1};
      margin: 0.5rem 0 4rem;
      border-radius: 4px;
      overflow: hidden;

      div {
        min-width: 16rem;
        padding: 1rem 2rem;
        cursor: pointer;
        text-align: center;
        ${Transition()};

        :first-child {
          :before {
            content: '';
            position: absolute;
            top: 50%;
            left: ${selected === 0 ? '-2px' : 'calc(50% - 2px)'};
            transform: translateY(-50%);
            height: 110%;
            width: calc(50% + 4px);
            background: ${theme.colors.primary_1};
            z-index: 0;
            ${Transition()};
          }
        }

        :hover {
          :first-child,
          :last-child {
            border-color: ${theme.colors.primary_1};
          }
        }

        :first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border: 2px solid ${theme.colors.grey_4};
          border-right-color: transparent;

          > span {
            color: ${selected === 0 ? theme.colors.white : theme.colors.grey_1};
          }
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border: 2px solid ${theme.colors.grey_4};
          border-left-color: transparent;

          > span {
            color: ${selected === 1 ? theme.colors.white : theme.colors.grey_1};
          }
        }

        span {
          position: relative;
          display: block;
          ${Transition('color')};
          z-index: 1;
        }
      }
    `;
  }};
`;

export const ChartView = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      margin-bottom: 4rem;

      > span {
        font-size: 1.8rem;
        color: ${theme.colors.grey_1};
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

      h1 {
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 2rem;
        color: ${theme.colors.primary_4};
      }
    `;
  }};
`;

export const Expected = styled.div<Types.ExpectedAndRealProps>`
  ${(props) => {
    const { theme, identification, view } = props;

    return css`
      position: relative;

      span {
        :first-child:after {
          background: ${theme.colors.primary_2};

          ${identification === EChartList.TAKT_PER_STATION &&
          css`
            background: ${theme.colors.primary_4};
          `}

          ${identification === EChartList.STOPPAGE_PER_STATION &&
          css`
            background: ${theme.colors.grey_9};
          `}

          ${identification === EChartList.FAILURE_PER_STATION &&
          css`
            background: ${theme.colors.grey_9};
          `}

          ${(identification === EChartList.FAILURE_FORECASTING ||
            identification === EChartList.STOPPAGE_FORECASTING) &&
          view &&
          css`
            background: ${theme.colors.primary_6};
          `}
        }

        + span {
          color: ${theme.colors.primary_2};

          ${identification === EChartList.TAKT_PER_STATION &&
          css`
            color: ${theme.colors.primary_4};
          `}

          ${identification === EChartList.STOPPAGE_PER_STATION &&
          css`
            color: ${theme.colors.grey_9};
          `}

          ${identification === EChartList.FAILURE_PER_STATION &&
          css`
            color: ${theme.colors.grey_9};
          `}

          ${(identification === EChartList.FAILURE_FORECASTING ||
            identification === EChartList.STOPPAGE_FORECASTING) &&
          view &&
          css`
            color: ${theme.colors.primary_6};
          `}
        }
      }
    `;
  }};
`;

export const Real = styled.div<Types.ExpectedAndRealProps>`
  ${(props) => {
    const { theme, identification, view } = props;

    return css`
      position: relative;

      span {
        :first-child:after {
          background: ${theme.colors.primary_3};

          ${identification === EChartList.TAKT_PER_STATION &&
          css`
            background: ${theme.colors.secondary_2};
          `}

          ${identification === EChartList.STOPPAGE_PER_STATION &&
          css`
            background: ${theme.colors.primary_4};
          `}

          ${identification === EChartList.FAILURE_PER_STATION &&
          css`
            background: ${theme.colors.red_2};
          `}

          ${(identification === EChartList.FAILURE_FORECASTING ||
            identification === EChartList.STOPPAGE_FORECASTING) &&
          view &&
          css`
            background: ${theme.colors.primary_4};
          `}
        }

        + span {
          color: ${theme.colors.primary_3};

          ${identification === EChartList.TAKT_PER_STATION &&
          css`
            color: ${theme.colors.secondary_2};
          `}

          ${identification === EChartList.STOPPAGE_PER_STATION &&
          css`
            color: ${theme.colors.primary_4};
          `}

          ${identification === EChartList.FAILURE_PER_STATION &&
          css`
            color: ${theme.colors.red_2};
          `}

          ${(identification === EChartList.FAILURE_FORECASTING ||
            identification === EChartList.STOPPAGE_FORECASTING) &&
          view &&
          css`
            color: ${theme.colors.primary_4};
          `}
        }
      }
    `;
  }};
`;

export const Prediction = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: flex;
      flex-direction: column;

      div {
        display: flex;
        justify-content: space-between;
      }

      span {
        color: ${theme.colors.grey_2};
        font-size: 1.6rem;

        :first-child:after {
          content: '';
          position: absolute;
          top: 50%;
          left: -${theme.unit * 5}px;
          transform: translateY(-50%);
          width: ${theme.unit * 4}px;
          height: 6px;
        }

        + span {
          font-family: 'DaimlerBold', sans-serif;
          margin-left: 3rem;
        }
      }
    `;
  }};
`;

export const ChartDraw = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const FormGroup = styled(MuiFormGroup)`
  ${(props) => {
    const { theme } = props;

    return css`
      justify-content: flex-start;

      label {
        span.MuiButtonBase-root {
          color: ${theme.colors.grey_2};
          font-size: 1.6rem;
          :hover {
            background-color: rgba(0, 0, 0, 0.04);
          }
        }
        span.MuiTypography-root {
          color: ${theme.colors.grey_2};
          font-size: 1.6rem;
        }
      }
    `;
  }}
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
