import styled, { css } from 'styled-components';

export const Footer = styled.footer`
  ${(props) => {
    const { theme } = props;

    return css`
      position: fixed !important;
      max-height: 5rem;
      min-height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      border-top: 1px solid ${theme.colors.grey_6};
      background-color: ${theme.colors.white};

      p {
        font-family: 'DaimlerRegular', sans-serif;
        font-size: ${theme.typography.size.small};
        color: ${theme.colors.grey_1};

        span {
          font-family: 'DaimlerBold', sans-serif;
        }
      }
    `;
  }};
`;
