import styled, { css } from 'styled-components';

import { Elevation, Transition, Centralized } from 'utils/styles/mixins';

import { FailItemProps } from 'components/StationItemFaults/types';

export const Title = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;

      h1 {
        width: 100%;
        font-size: ${theme.typography.size.title_3};
        text-transform: uppercase;
        text-align: center;
        padding: 0.5rem 1rem 0.5rem 40px;
      }

      span {
        position: relative;
        width: ${theme.unit * 5}px;
        height: ${theme.unit * 5}px;
        padding: ${theme.unit}px;
        cursor: pointer;
        transform: scale(1);
        margin-right: -8px;
        ${Transition('transform', 0.3)};

        :hover {
          transform: scale(1.2) rotate(180deg);
        }

        :before {
          content: '';
          position: absolute;
          width: calc(100% - 16px);
          height: 2px;
          border-radius: 2px;
          background-color: ${theme.colors.primary_2};
          ${Centralized(css`
            rotate(-45deg)
          `)}
        }

        :after {
          content: '';
          position: absolute;
          width: calc(100% - 16px);
          height: 2px;
          border-radius: 2px;
          background-color: ${theme.colors.primary_2};
          ${Centralized(css`
            rotate(45deg)
          `)}
        }
      }
    `;
  }};
`;

export const Scroll = styled.div`
    max-height 340px;
    overflow: auto;
`;

export const Status = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;

      h2 {
        font-size: ${theme.typography.size.normal};
        text-transform: ${theme.typography.case.uppercase};
        font-weight: ${theme.typography.weight.normal};
        span {
          font-weight: ${theme.typography.weight.bold};
        }
      }

      hr {
        margin: ${theme.unit}px 0;
      }
    `;
  }};
`;

export const FailAnalogSignals = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: flex;
      border-radius: ${theme.unit}px;
      border: 1px solid ${theme.colors.grey_9};
      padding: ${theme.unit}px;
      margin: ${theme.unit}px 0;
    `;
  }}
`;

export const FaultListRow = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      width: 100%;
      justify-content: space-between;
    `;
  }}
`;

export const DetailsFaultListRow = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      margin-bottom: ${theme.unit * 2}px;

      h3 {
        font-size: ${theme.typography.size.normal};
        font-weight: ${theme.typography.weight.normal};
        span {
          font-weight: ${theme.typography.weight.bold};
        }
      }
    `;
  }}
`;

export const DetailsFaults = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: flex;
      flex-direction: column;
    `;
  }}
`;

export const DetailsStation = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 1rem;
    `;
  }};
`;

export const DetailsDrawerContent = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      min-height: 30rem;
      border-radius: ${theme.unit}px;
      background-color: ${theme.colors.white};
      ${Elevation(3)};
    `;
  }};
`;

export const DetailsDrawer = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 2rem ${theme.unit}px ${theme.unit}px;
      min-height: 30rem;
    `;
  }};
`;

export const RowStations = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;

  & > div {
    min-height: 26rem;
  }
`;

export const StationsContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      padding: 0 ${theme.distance.normal}rem ${theme.distance.normal}rem;
    `;
  }};
`;
