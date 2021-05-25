import styled, { css } from 'styled-components';

export const Content = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 56rem;
      height: 32rem;
      border-radius: 4px;
      padding: ${theme.distance.normal}rem;
      border: 1px solid ${theme.colors.grey_4};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: ${theme.colors.white};

      > svg {
        margin-bottom: ${theme.distance.big}rem;
      }

      p,
      h2 {
        color: ${theme.colors.grey_1};
      }

      h2 {
        font-family: 'DaimlerBold', sans-serif;
        font-size: 2.4rem;
        text-align: center;
      }

      div {
        &,
        p {
          font-size: 1.6rem;
          margin-top: ${theme.distance.small}rem;
        }

        button {
          padding: 1rem 2rem;
          border: 0;
          border-radius: 4px;
          background-color: ${theme.colors.primary_1};
          font-size: 1.6rem;
          color: ${theme.colors.white};
          display: flex;
          align-items: center;
          cursor: pointer;

          svg {
            margin-left: 8px;
          }
        }
      }
    `;
  }};
`;

export const Container = styled.main`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: ${theme.distance.stout * 2}rem;
      display: flex;
      justify-content: center;
    `;
  }};
`;
