import styled from 'styled-components';
import { Grid, Typography, Divider } from '@material-ui/core';
import { theme } from 'styles/theme';

export const Line = styled(Grid)`
  && {
    max-width: 80%;
    flex-basis: 80%;
  }
  border-right: 1px solid ${theme.colors.grey_14};
`;

export const CustomGrid = styled(Grid)<{
  custompadding?: string;
  marginleft?: string;
  marginright?: string;
  customwidth?: string;
  customheight?: string;
}>`
  ${({ custompadding }) =>
    custompadding &&
    `
    && {
      padding: ${custompadding} !important;
    }
`}

  ${({ marginleft }) =>
    marginleft &&
    `
    && {
      margin-left: ${marginleft};
    }
`}

${({ marginright }) =>
    marginright &&
    `
    && {
      margin-right: ${marginright};
    }
`}

${({ customwidth }) =>
    customwidth &&
    `
width: ${customwidth};
`}

${({ customheight }) =>
    customheight &&
    `
height: ${customheight};
`}
`;

export const CustomContainer = styled.div`
  padding: 24px 10px;
`;

export const StationDivider = styled(Divider)`
  && {
    background-color: ${theme.colors.grey_3};
    min-width: 800px;
    width: 80%;
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
  width: clamp(50px, ((100vw - 80rem) / 16), 80px);
  height: clamp(50px, ((100vw - 80rem) / 16), 80px);
  border-radius: 4px;

  ${({ isActive }) =>
    isActive &&
    `
  border: 3px solid black !important;
`}
`;

export const Legend = styled.div<{
  backgroundcolor?: string;
  isrotate?: boolean;
  customWidth?: string;
  customHeight?: string;
  iconcolor?: string;
}>`
  display: flex;
  justify-content: center;
  text-align: center;
  width: clamp(50px, ((100vw - 80rem) / 16), 80px);
  height: clamp(50px, ((100vw - 80rem) / 16), 80px);
  border-radius: 4px;
  background-color: ${theme.colors.grey_12};
  h3 {
    margin: auto;
    word=break: break-all;
  }
  svg {
    margin: auto;
    ${({ iconcolor }) =>
      iconcolor &&
      ` 
    color: ${iconcolor};
    `}
    width: 3vh;
    height: 3vh;
    font-size: clamp(1rem, -0.1429rem + 1.7857vw, 2rem);
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

  ${({ isrotate }) =>
    isrotate &&
    `
  transform: rotate(180deg);
}
`}
  ${({ backgroundcolor }) =>
    backgroundcolor &&
    `
background-color: ${backgroundcolor};
`}
`;

export const StationEmpty = styled.div`
  border: 1px solid ${theme.colors.grey_14};
  width: clamp(50px, ((100vw - 80rem) / 16), 80px);
  height: clamp(50px, ((100vw - 80rem) / 16), 80px);
  border-radius: 4px;
`;

export const Font = styled(Typography)<{
  isnumber?: string;
  isvertical?: string;
  fontSize?: string;
}>`
  ${({ isvertical }) =>
    isvertical === 'true' &&
    `
    font-size: clamp(1rem, -0.1429rem + 1.7857vw, 2rem);
      writing-mode: vertical-lr;
      text-orientation: mixed;
      transform: rotate(180deg);
  `}
  ${({ isnumber }) =>
    isnumber === 'true'
      ? `
      && {
        color: ${theme.colors.white};
        font-size: clamp(1rem, -0.3714rem + 2.1429vw, 2.2rem);
      }
      `
      : `
      color: ${theme.colors.grey_13};
      && {
        font-size: clamp(1rem, 0.3143rem + 1.0714vw, 1.6rem);
        font-weight: 700;
      }
      `}
      ${({ fontSize }) => `
        font-size: ${fontSize};
      `}
    && {
    margin: auto;
    font-family: 'DaimlerBold', sans-serif;
    font-weight: 700;
  }
`;

export const Group = styled(Grid)`
  background-color: ${theme.colors.grey_14};
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
  ${({ alignself }) => `
   align-self: ${alignself} !important;
`}
  ${({ customheigth }) => `
height: ${customheigth} !important;
`}
`;
