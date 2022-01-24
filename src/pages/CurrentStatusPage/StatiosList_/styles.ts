import styled from 'styled-components';
import { Grid, Typography, Container } from '@material-ui/core';

export const CustomContainer = styled(Container)`
  && {
    padding: 0 20px;
  }
`;

export const Station = styled.div<{
  backgroundColor?: string;
  isActive?: boolean;
}>`
  ${({ backgroundColor }) =>
    backgroundColor &&
    `
background-color: ${backgroundColor};
`}
  display: flex;
  justify-content: center;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 4px;

  ${({ isActive }) =>
    isActive &&
    `
  border: 1px solid black !important;
`}
`;

export const Legend = styled.div<{
  backgroundColor?: string;
  rotate?: boolean;
}>`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 60px;
  min-width: 60px;
  border-radius: 4px;
  background-color: #dddddd;
  h3 {
    margin: auto;
    word=break: break-all;
  }
  svg {
    margin: auto;
    color: #666666;
  }
  ${({ rotate }) =>
    rotate &&
    `
  transform: rotate(180deg);
}
`}
  ${({ backgroundColor }) =>
    backgroundColor &&
    `
background-color: ${backgroundColor};
svg {
  color: white;
}
`}
`;

export const StationEmpty = styled.div`
  border: 1px solid #dddddd;
  width: 60px;
  height: 60px;
  border-radius: 4px;
`;

export const Font = styled(Typography)<{
  isNumber?: boolean;
  isVertical?: boolean;
  fontSize?: string;
}>`
  ${({ isNumber }) =>
    isNumber
      ? `
    color: #fff;
    && {
      font-size: 1.8rem;
    }
    `
      : `
    color: #666666;
    && {
      font-size: 1.3rem;
      font-weight: 700;
    }
  `}

  ${({ isVertical }) =>
    isVertical &&
    `
      writing-mode: vertical-lr;
      text-orientation: mixed;
`}

${({ fontSize }) =>
    fontSize &&
    `
    && {
      font-size: ${fontSize};
    }
`}

  margin: auto !important;
  && {
    font-family: 'DaimlerBold', sans-serif;
    font-weigh: 700;
  }
`;

export const Group = styled(Grid)`
  background-color: #f3f3f3;
  border: 2px solid #eff3f8;
  border-radius: 4px;
`;

export const LegendTooltip = styled.div<{ backgroundColor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 1vw;
  ${({ backgroundColor }) => `
  background-color: ${backgroundColor};
`}
`;

export const GridToolTip = styled(Grid)<{
  alignSelf: string;
  customheigth: string;
}>`
  display: flex;
  align-items: flex-end;
  h3 {
    margin: 0;
  }
  ${({ alignSelf }) => `
   align-self: ${alignSelf} !important;
`}
  ${({ customheigth }) => `
height: ${customheigth} !important;
`}
`;
