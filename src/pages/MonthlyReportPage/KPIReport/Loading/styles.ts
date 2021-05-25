import styled, { css } from 'styled-components';

export const Container = styled('div').attrs({
  className: 'loading',
})`
  ${() => {
    return css`
      &.loading {
        position: absolute;
        top: -4px;
        margin-bottom: 3rem;
        display: flex;
        flex-direction: column;
        z-index: 1;

        .loading__title {
          width: 20rem;
          height: 3rem;
          margin-bottom: 1rem;
        }

        .loading__wrapper {
          display: flex;
        }

        .loading__content {
          width: 14rem;
          max-width: 14rem;
          height: 15rem;
          max-height: 15rem;
          border-radius: 4px;
          overflow: hidden;

          & + div {
            margin-left: 2rem;
          }
        }

        div {
          margin-bottom: 5px;
        }

        svg {
          width: 100%;
        }
      }
    `;
  }};
`;
