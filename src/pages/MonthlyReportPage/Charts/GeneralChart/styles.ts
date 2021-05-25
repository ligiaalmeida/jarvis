import styled, { css } from 'styled-components';

export const Labels = styled.div`
  ${() => {
    return css`
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 5rem;

      > div {
        display: flex;
        align-items: center;

        + div {
          margin-left: 40px;
        }
      }
    `;
  }};
`;

export const Container = styled.div.attrs({
  className: 'current-takt',
})`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 2rem;
      border: 1px solid ${theme.colors.grey_4};
      border-radius: 4px;

      .current-takt__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h3 {
          font-size: 2.5rem;
          font-weight: normal;
          color: ${theme.colors.grey_1};
        }

        div {
          display: flex;
          align-items: center;

          > span {
            display: block;
            font-size: 1.6rem;
            color: ${theme.colors.grey_1};
            margin-left: 8px;
          }
        }
      }

      h4 {
        font-size: 1.4rem;
        color: ${theme.colors.grey_1};
        margin-bottom: 2rem;
      }

      canvas {
        + div {
          display: flex;
          justify-content: flex-end;
        }
      }
    `;
  }};
`;
