import styled, { css } from 'styled-components';

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
      padding: 0 ${theme.distance.normal}rem ${theme.distance.normal}rem;
    `;
  }};
`;
