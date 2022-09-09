import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { Elevation, Transition } from 'utils/styles/mixins';
import HeroImg from 'assets/img/login__hero--2.jpg';

export const ContainerWrapper = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      background: ${theme.colors.white};
      display: grid;
      grid-template: 100% / auto 475px;

      .sign-in__img-hero {
        height: 100vh;
        overflow: hidden !important;
        background-size: cover;
        background-image: url(${HeroImg});
      }

      .sign-in__content {
        display: grid;
        grid-template-rows: [row1-start] 15% [row1-end] 50% [third-line] 50% [last-line];
        justify-content: stretch;
        align-items: flex-start;
      }

      .sign-in__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        img {
          width: 30rem;
          margin: 2rem;
        }
      }

      footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
      }
    `;
  }}
`;

export const BlueBox = styled.div`
  position: relative;

  ${(props) => {
    const { theme } = props;

    return css`
      padding: ${theme.unit * 2}px 0;
      color: ${theme.colors.white};
      background: ${theme.colors.primary_1};
      height: 90%;
    `;
  }}
`;

export const FormContent = styled.div`
  ${(props) => {
    const { theme } = props;
    return css`
      float: inline-start;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      form {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .sign-in__form-content {
        position: relative;
        margin: 0 auto;
        padding: ${theme.unit * 2}px;
        border-radius: ${theme.unit}px;
        background: ${theme.colors.white};
        ${Elevation(2)};

        h1 {
          font-size: 2.8rem;
          color: ${theme.colors.primary_1};
        }

        p {
          font-size: 1.8rem;
          color: ${theme.colors.grey_1};
          margin-bottom: ${theme.unit}px;
        }
      }

      .sign-in__form-group {
        width: 100%;
        margin-bottom: ${theme.unit}px;

        &--message {
          margin-top: ${theme.unit * 3}px;
          margin-bottom: 0;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid ${theme.colors.grey_4};
          background-color: ${theme.colors.grey_8};

          span {
            font-family: ${theme.typography.family.title};
            font-size: ${theme.typography.size.normal};
            color: ${theme.colors.primary_1};
          }
        }

        + div {
          padding-left: 0;
          margin-bottom: 0;
        }

        label {
          color: ${theme.colors.grey_2};
          font-size: ${theme.typography.size.normal};
          text-align: left;
        }

        input {
          font-size: ${theme.typography.size.normal};
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid ${theme.colors.grey_3};

          &:focus {
            outline: 0;
            border: 1px solid ${theme.colors.primary_3};
          }
        }
      }

      button {
        border: 0;
        border-radius: 4px;
        margin-top: ${theme.unit * 2}px;
        font-family: 'DaimlerLight', sans-serif;
        color: ${theme.colors.white};
        font-size: ${theme.typography.size.normal};
        background-color: ${theme.colors.primary_1};
        ${Transition('background-color', 0.3)};
        cursor: pointer;

        :hover {
          background-color: ${shade(0.2, theme.colors.primary_1)};
        }

        ${theme.breakpoints.default('min').xs(css`
          padding: 1rem 5rem;
        `)};

        ${theme.breakpoints.default('min').md(css`
          padding: 1rem 3rem;
        `)};

        ${theme.breakpoints.default('min').lg(css`
          padding: 1rem 5rem;
        `)};
      }
    `;
  }}
`;
