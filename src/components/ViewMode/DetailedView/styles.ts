import styled, { css } from 'styled-components';

import { Elevation, Transition, CustomScrollBar } from 'utils/styles/mixins';

import { FailItemProps } from '../../StationItemFaults/types';

export const EventItem = styled.div`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      background-color: rgba(255, 255, 255, 0);
      ${Transition('background-color')};

      :hover {
        background-color: ${theme.colors.grey_6};
      }

      * {
        user-select: none;
      }

      + div {
        border-top: 1px solid ${theme.colors.grey_6};
      }

      div {
        display: flex;
        font-size: 1.3rem;

        + div {
          margin-left: 1rem;
        }

        :nth-child(1) {
          min-width: 3rem;
          justify-content: flex-start;
          font-size: 1.2rem;
        }

        span:nth-child(2) {
          margin-left: 1rem;
        }
      }
    `;
  }};
`;

export const EventList = styled.div`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 1rem 0;
      max-height: 30rem;
      overflow-y: auto;

      ${CustomScrollBar(theme.colors.primary_1)}
    `;
  }};
`;

export const FailEvents = styled.div`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      top: -16px;
      right: -45%;
      width: 35rem;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: ${theme.colors.white};
      ${Elevation(2)};
      z-index: 1;

      :after {
        content: '';
        position: absolute;
        top: 29px;
        left: -5px;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        // background-color: ${theme.colors.white};
      }

      ${EventItem} {
      }

      p {
        font-size: 1.4rem;
        color: ${theme.colors.primary_1};
      }

      span {
        color: ${theme.colors.grey_1};
      }

      p {
        text-align: center;
        padding-bottom: 8px;
        border-bottom: 1px solid ${theme.colors.grey_4};
      }

      > div:first-child {
        padding: 1rem 1.5rem;

        span {
          margin-left: 0;
        }
      }
    `;
  }};
`;

export const FailName = styled.div<FailItemProps>`
  ${(props: { color: any }) => {
    const { color } = props;

    return css`
      position: relative;
      min-width: 55%;
      background-color: ${color};
      font-family: 'DaimlerBold', sans-serif;
      font-size: 16px;
      color: #fff;
      border-radius: 16px;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;

      > span:nth-child(2) {
        cursor: pointer;

        :hover {
          svg {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        svg {
          pointer-events: none;
          transform: scale(1);
          opacity: 0.75;
          ${Transition('transform, opacity', 0.25)};
        }
      }
    `;
  }};
`;

export const FailItem = styled.div.attrs({
  className: 'fail-item',
})`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      align-items: center;
      width: ${100 / 3}%;
      padding-right: 1rem;

      ${theme.breakpoints.custom(
        'max',
        1140,
        css`
          width: 100%;
          ${Transition('width', 0.25)}
        `
      )}

      div span,
      span {
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .fail-item__quantity {
        position: relative;
        display: flex;

        div.fail-item__quantity-content {
          position: relative;
          min-width: 40px;
          height: 40px;
          margin-left: 1rem;
          padding: 2px;
          border-radius: 50%;
          border: 2px solid ${theme.colors.grey_3};
          display: flex;
          justify-content: center;
          align-items: center;

          > span {
            display: block;
            font-size: 1.6rem;
            color: ${theme.colors.primary_1};
            width: fit-content;
            height: fit-content;
            margin-right: 2px;
            margin-bottom: 1px;
          }

          + div {
            left: -4px;

            span {
              height: auto;
              display: block;

              strong {
                color: ${theme.colors.primary_1};
              }
            }
          }
        }
      }

      > span:nth-child(3) {
        font-size: 1.8rem;
        color: ${theme.colors.primary_1};
        margin-left: 1rem;
      }
    `;
  }};
`;

export const FaultListRow = styled.div`
  ${() => {
    // const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      margin-bottom: 1rem;

      :last-child {
        margin-bottom: 0;
      }
    `;
  }};
`;

export const DetailsStation = styled.div`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      padding: 1rem;

      h1 {
        text-align: center;
        margin-bottom: 2rem;
      }
    `;
  }};
`;

export const DetailsDrawerContent = styled.div`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      min-height: 30rem;
      border-radius: ${theme.unit}px;
      background-color: ${theme.colors.white};
      display: flex;
      ${Elevation(3)};
    `;
  }};
`;

export const DetailsDrawer = styled.div`
  ${(props: { theme: any }) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 2rem ${theme.unit}px ${theme.unit}px;
      min-height: 30rem;
    `;
  }};
`;

export const RowStations = styled.div`
  ${() => {
    // const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;

      & > div {
        min-height: 26rem;
        width: 100%;
      }
    `;
  }};
`;

export const StationsContent = styled.div`
  ${() => {
    // const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
    `;
  }};
`;

export const Container = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      padding: 0 0 ${theme.distance.normal}rem 0;
    `;
  }};
`;
