import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { Typography } from '@material-ui/core';
import { Elevation, Transition } from 'utils/styles/mixins';
import Background from 'assets/img/login_background.png';
import { theme } from 'styles/theme';

export const Logo = styled.img`
  height: auto;
  width: 10%;
`;

export const Font = styled(Typography)<{ fontcolor?: string }>`
  && {
    ${({ fontcolor }) =>
      fontcolor
        ? `
    color: ${fontcolor};
  
`
        : `
  font-size: 0.8vw;
  color: ${theme.colors.grey_16};

`}
  }
`;

export const LoginBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ContainerWrapper = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      position: relative;
      background: ${theme.colors.white};

      .sign-in__row-container {
        position: relative;
        width: 100%;
        height: 100vh;
        top: 0;
      }

      .sign-in__img-hero {
        position: relative;
        overflow: hidden;
        background-size: cover;
        background-image: url(${Background});
        background-position: 30% 10%;

        ${theme.breakpoints.default('min').xs(css`
          display: none;
        `)};

        ${theme.breakpoints.default('min').md(css`
          display: block;
        `)};
      }

      .sign-in__row-content {
        position: absolute;
        width: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
      }

      .sign-in__content {
        img {
          width: 30rem;
          margin: 2rem auto;
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

export const Hero = styled.img`
  ${(props) => {
    const { theme } = props;

    return css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      ${theme.breakpoints.default('min').xs(css`
        width: auto;
        height: 100%;
        display: none;
      `)};

      ${theme.breakpoints.default('min').sm(css`
        display: block;
      `)};

      ${theme.breakpoints.default('min').md(css`
        width: auto;
        height: 100%;
      `)};

      ${theme.breakpoints.default('min').lg(css`
        width: auto;
      `)};
    `;
  }};
`;

export const FormContent = styled.div`
  ${(props) => {
    const { theme } = props;

    return css`
      width: 100%;

      .sign-in__form-content {
        position: relative;
        margin: 0 auto;
        padding: 2rem 4rem;
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
          margin-bottom: 4rem;
        }
      }

      .sign-in__form-group {
        width: 100%;
        margin-bottom: 1.5rem;

        &--message {
          margin-top: ${theme.unit * 3}px;
          margin-bottom: 0;
          padding: 1.5rem 1rem;
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
        margin-top: 2rem;
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

export const BlueBox = styled.div`
  position: relative;

  ${(props) => {
    const { theme } = props;

    return css`
      padding: 10rem 0;
      color: ${theme.colors.white};
      background: ${theme.colors.primary_1};
    `;
  }}
`;
