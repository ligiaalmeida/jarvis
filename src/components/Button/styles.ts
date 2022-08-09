import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Button } from '@material-ui/core';

export const MuiButton = styled(Button)<{
  backgroundcolor?: string;
  margintop?: string;
  variant?: string;
}>`
  && {
    ${({ backgroundcolor }) =>
      backgroundcolor === 'darkBlue'
        ? `
  background-color: ${theme.colors.blue_2}
  `
        : `
  background-color: ${theme.colors.primary_2}
  `};

    color: white;
    padding: 10px;
    font-size: 1.5rem;
    ${({ margintop }) =>
      margintop &&
      `
    margin-top: ${margintop};
    `}
  }
`;
