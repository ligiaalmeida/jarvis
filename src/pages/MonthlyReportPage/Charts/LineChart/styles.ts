import styled, { css } from 'styled-components';

export const Labels = styled.div`
  ${() => {
    return css`
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 3rem;

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
  className: 'kpi-charts',
})`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 2rem;
      border: 1px solid ${theme.colors.grey_4};
      border-radius: 4px;

      .kpi-charts__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h3 {
          font-size: 2.5rem;
          font-weight: normal;
          color: ${theme.colors.grey_1};
          margin-bottom: 2rem;
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
    `;
  }};
`;
