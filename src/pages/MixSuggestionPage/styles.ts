import styled, { css } from 'styled-components';
import { Transition } from 'utils/styles/mixins';

export const customCSSInputList = css`
  margin-right: 0;
`;

export const Content = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      display: flex;
      flex-direction: row;
      ${Transition()}

      ${theme.breakpoints.default('max').md(css`
        flex-direction: column;
      `)}
    `;
  }};
`;

export const Main = styled.main`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      padding: 0 ${theme.distance.normal}rem ${(theme.unit * 7) / 10}rem;
    `;
  }};
`;

export const TopContent = styled.div`
  align-items: center;
  display: flex;
  height: 10rem;
  justify-content: space-between;
  margin-right: -2.4rem;
`;

export const TopContentLeft = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      span {
        color: ${theme.colors.grey_1};
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 1.8rem;
        margin-right: 1rem;
      }
    `;
  }}
`;

export const TopContentRight = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      a.btn-export {
        border: 1px solid ${theme.colors.grey_4};
        border-radius: 4px;
        color: ${theme.colors.grey_1};
        font-family: 'DaimlerRegular', sans-serif;
        font-size: 1.6rem;
        margin: 0 1rem;
        padding: 8px;
        text-decoration: none;
        transition: all 0.4s ease-in-out;

        :hover {
          border-color: ${theme.colors.primary_1};
        }

        :focus {
          border-color: ${theme.colors.primary_1};
        }
      }
      > div {
        padding: 0;
      }
    `;
  }};
`;
