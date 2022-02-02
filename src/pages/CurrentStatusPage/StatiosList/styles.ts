import styled from 'styled-components';
import { Grid, Typography, Divider } from '@material-ui/core';

export const CustomContainer = styled.div`
  padding: 0 10px;
`;

export const StationDivider = styled(Divider)<{ direction?: string }>`
  && {
    ${({ direction }) =>
      direction === 'vertical'
        ? `
  width:calc((10vw - 8rem) / 20)
  `
        : `
  height:calc((10vw - 8rem) / 20)
  `}
  }
`;

export const Station = styled.div<{
  backgroundcolor?: string;
  isActive?: boolean;
}>`
  ${({ backgroundcolor }) =>
    backgroundcolor &&
    `
background-color: ${backgroundcolor};
`}
  display: flex;
  justify-content: center;
  text-align: center;
  width: calc((100vw - 80rem) / 16);
  height: calc((100vw - 80rem) / 16);
  border-radius: 4px;

  ${({ isActive }) =>
    isActive &&
    `
  border: 1px solid black !important;
`}
`;

export const Legend = styled.div<{
  backgroundcolor?: string;
  rotate?: boolean;
  customWidth?: string;
  customHeight?: string;
}>`
  display: flex;
  justify-content: center;
  text-align: center;
  width: calc((100vw - 80rem) / 16);
  height: calc((100vw - 80rem) / 16);
  min-height: 60px;
  min-width: 60px;
  border-radius: 4px;
  background-color: #cccccc;
  h3 {
    margin: auto;
    word=break: break-all;
  }
  svg {
    margin: auto;
    color: #666666;
  }

  ${({ customHeight }) =>
    customHeight &&
    `
height: ${customHeight};
}
`}

  ${({ customWidth }) =>
    customWidth &&
    `
width: ${customWidth};
}
`}

  ${({ rotate }) =>
    rotate &&
    `
  transform: rotate(180deg);
}
`}
  ${({ backgroundcolor }) =>
    backgroundcolor &&
    `
background-color: ${backgroundcolor};
svg {
  color: white;
}
`}
`;

export const StationEmpty = styled.div`
  border: 1px solid #dddddd;
  width: calc((100vw - 80rem) / 16);
  height: calc((100vw - 80rem) / 16);
  border-radius: 4px;
`;

export const Font = styled(Typography)<{
  isnumber?: boolean;
  isvertical?: boolean;
  fontSize?: string;
}>`
  ${({ isnumber }) =>
    isnumber === true
      ? `
    color: #fff;
      && {
        font-size: 2.5vh;
      }
    `
      : `
    color: #666666;
    && {
      font-size: 1.5vh;
      font-weight: 700;
  `}

  ${({ isvertical }) =>
    isvertical &&
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
  background-color: #dddddd;
  border: 2px solid #eff3f8;
  border-radius: 4px;
`;

export const LegendTooltip = styled.div<{ backgroundcolor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 1vw;
  ${({ backgroundcolor }) => `
  background-color: ${backgroundcolor};
`}
`;

export const GridToolTip = styled(Grid)<{
  alignself: string;
  customheigth: string;
}>`
  display: flex;
  align-items: flex-end;
  h3 {
    margin: 0;
  }
  ${({ alignself }) => `
   align-self: ${alignself} !important;
`}
  ${({ customheigth }) => `
height: ${customheigth} !important;
`}
`;
