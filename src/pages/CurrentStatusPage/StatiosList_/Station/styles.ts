import styled from 'styled-components';
import { Typography, Card } from '@material-ui/core';

export const CardStation = styled(Card)<{ backgroundColor?: string }>`
  ${({ backgroundColor, theme }) =>
    backgroundColor &&
    `
        background-color: ${backgroundColor} !important;
        border-radius: ${theme.unit + 4}px;
    `}

  height: auto;
  width: 100%;
  min-height: 20rem;
  padding: 1vw;
  line-height: 1;
`;

export const Font = styled(Typography)<{
  fontColor: string;
  fontSize: string;
  fontWeight: string;
}>`
  ${({ fontColor, fontSize, fontWeight }) =>
    fontColor &&
    fontSize &&
    fontWeight &&
    `  && {
      color: ${fontColor} ;
      font-size: ${fontSize} ;
      font-weight:${fontWeight};
    }
`}
`;

export const LegendTooltip = styled.div`
  display: flex;
  direction: row;
`;

export const Tooltip = styled.div<{
  backgroundColor?: string;
  shape?: string;
  hasBorder?: boolean;
}>`
  ${({ shape }) =>
    shape === 'circle'
      ? `
border-radius: 1vw;
`
      : `
border-radius: 4px;
`}

  ${({ hasBorder }) =>
    hasBorder &&
    `
border: 1px solid black;
`}

  width: 1vw;
  height: 1vw;
  margin-right: 5%;
  ${({ backgroundColor }) => `
background-color: ${backgroundColor};
`}
`;
