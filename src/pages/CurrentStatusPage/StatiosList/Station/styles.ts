import styled from 'styled-components';
import { Typography, Card, Grid } from '@material-ui/core';

export const GridItem = styled(Grid)<{ textalign?: string }>`
  ${({ textalign }) =>
    textalign &&
    `
text-align: ${textalign};
`}
`;

export const CardStation = styled(Card)<{ backgroundcolor?: string }>`
  ${({ backgroundcolor, theme }) =>
    backgroundcolor &&
    `
        background-color: ${backgroundcolor} !important;
        border-radius: ${theme.unit + 4}px;
    `}

  height: auto;
  width: 100%;
  min-height: 20rem;
  padding: 1vw;
  line-height: 1;
`;

export const Font = styled(Typography)<{
  fontcolor: string;
  fontSize: string;
  fontWeight: string;
}>`
  ${({ fontcolor, fontSize, fontWeight }) =>
    fontcolor &&
    fontSize &&
    fontWeight &&
    `  && {
      color: ${fontcolor} ;
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
  backgroundcolor?: string;
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
  ${({ backgroundcolor }) => `
background-color: ${backgroundcolor};
`}
`;
