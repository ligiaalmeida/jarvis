import styled, { css } from 'styled-components';
import { Centralized } from 'utils/styles/mixins';

export const Container = styled.div`
  ${() => {
    return css`
      position: relative;
      width: 100%;
      height: 100vh;

      img {
        ${Centralized()}
      }
    `;
  }};
`;
