import styled from 'styled-components';
import { Typography, Grid } from '@material-ui/core';
import { theme } from 'styles/theme';

export const CustomContainer = styled.div`
  padding: 24px;
`;

export const GridItem = styled(Grid)<{
  textalign?: string;
  backgroundcolor?: string;
}>`
  width: 100%;
  padding: 10px 0 30px 0;
  && {
    margin-bottom: 20px;
  }

  ${({ textalign }) =>
    textalign &&
    `
text-align: ${textalign};
`}

  ${({ backgroundcolor, theme }) =>
    backgroundcolor &&
    `
    background-color: ${backgroundcolor} !important;
    border-radius: ${theme.unit + 4}px;
`}
`;

export const CardStation = styled.div`
  background-color: ${theme.colors.grey_15} !important;
  border-radius: 4px;
  height: auto;
  width: 100%;
  min-height: 20rem;
  padding: 1vw;
  line-height: 1;
  margin-bottom: 1rem;
`;

export const Font = styled(Typography)<{
  fontcolor: string;
  fontSize: string;
  fontWeight: string;
  margin?: string;
}>`
  ${({ fontcolor, fontSize, fontWeight }) =>
    fontcolor &&
    fontSize &&
    fontWeight &&
    `  && {
      font-size: ${fontSize} ;
      font-weight:${fontWeight};
    }
    color: ${fontcolor} ;
`}
`;

export const LegendTooltip = styled.div`
  display: flex;
  direction: row;
  align-items: baseline;
`;

export const Tooltip = styled.div<{
  backgroundcolor?: string;
  shape?: string;
  hasBorder?: boolean;
}>`
  ${({ shape }) =>
    shape === 'circle'
      ? `
border-radius: 8px;
`
      : `
border-radius: 4px;
`}

  ${({ hasBorder }) =>
    hasBorder &&
    `
border: 2px solid ${theme.colors.grey_16};
`}

  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  margin-right: 5%;
  ${({ backgroundcolor }) => `
background-color: ${backgroundcolor};
`}
`;
