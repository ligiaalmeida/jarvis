import styled from 'styled-components';
import { Card, Typography } from '@material-ui/core';

export const MuiCard = styled(Card)<{ cardmargin?: string }>`
  padding: 30px;
  width: -webkit-fill-available;
  ${({ cardmargin }) =>
    cardmargin &&
    `
  margin ${cardmargin};
  `}
  && {
    border-radius: 10px;
  }
`;

export const Font = styled(Typography)<{ istitle?: string }>`
  && {
    ${({ istitle }) =>
      istitle
        ? `
    font-weight: bolder;
    font-size: 2vw;
    `
        : `
    font-size: 1vw;
    `}
  }
`;

export const Margin = styled.div`
  margin-bottom: 20px;
`;
