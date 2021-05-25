import baseStyled, { ThemedStyledInterface, FlattenSimpleInterpolation } from 'styled-components';

import { SizesBreakpoints, GridSizes } from './Styles';

export type Sizes = {
  sm: (...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
  md: (...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
  lg: (...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
  xl: (...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
  xxl: (...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
};

export type Theme = {
  unit: number;
  layout: {
    navigation: {
      height: {
        on: number;
        off: number;
      };
    };
    inputListToPage: {
      distance: {
        top: number;
        bottom: number;
        height: number;
      };
    };
    nav_tabs: {
      header: {
        padding: {
          top: number;
          bottom: number;
        };
        height: number;
      };
    };
    footer: {
      height: number;
    };
  };
  colors: {
    primary_1: string;
    primary_2: string;
    primary_3: string;
    primary_4: string;
    primary_5: string;
    primary_6: string;
    primary_7: string;
    primary_8: string;
    secondary_1: string;
    secondary_2: string;
    tertiary_1: string;
    grey_1: string;
    grey_2: string;
    grey_3: string;
    grey_4: string;
    grey_5: string;
    grey_6: string;
    grey_7: string;
    grey_8: string;
    grey_9: string;
    grey_10: string;
    grey_11: string;
    red_1: string;
    red_2: string;
    white: string;
    black: string;
    blue_1: string;
    success: string;
    error: string;
    alert: string;
    success_bg: string;
    error_bg: string;
    alert_bg: string;
    online_bg: string;
    fails: {
      default: string;
      empty: string;
    };
  };
  gradient: {
    default: string;
    aijus: {
      background: string;
      menu: string;
    };
  };
  typography: {
    family: {
      text: string;
      subtitle: string;
      title: string;
      alternative: string;
    };
    weight: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    case: {
      capitalize: string;
      uppercase: string;
      lowercase: string;
    };
    lineHeight: string;
    size: {
      huge: string;
      big: string;
      title_1: string;
      title_2: string;
      title_3: string;
      normal: string;
      small: string;
      tiny: string;
    };
    align: {
      left: string;
      center: string;
      right: string;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
      wider: string;
    };
  };
  border: {
    size: {
      normal: string;
      big: string;
      stout: string;
    };
    radius: {
      none: string;
      normal: string;
      full: string;
    };
    shadow: {
      none: string;
      light: string;
      dark: string;
    };
  };
  distance: {
    tiny: number;
    small: number;
    normal: number;
    big: number;
    stout: number;
  };
  transition: {
    time: string;
    timeFunction: string;
  };
  awesomegrid: {
    container: {
      xs: { min: string; max: string };
      sm: { min: string; max: string };
      md: { min: string; max: string };
      lg: { min: string; max: string };
      xl: { min: string; max: string };
    };
    sizes: GridSizes;
    gutterWidth: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  icons: {
    small: {
      width: string;
      height: string;
    };
    medium: {
      width: string;
      height: string;
    };
    big: {
      width: string;
      height: string;
    };
  };
  brands: {
    products: {
      width: string;
      height: string;
    };
    partners: {
      width: string;
      height: string;
    };
    semantix: {
      width: string;
      height: string;
    };
  };
  images: {
    cards: {
      width: string;
      height: string;
    };
    services: {
      width: string;
      height: string;
    };
  };
  mapRange: string[];
  breakpoints: {
    default: (size: 'min' | 'max') => SizesBreakpoints;
    custom: (type: 'min' | 'max', value: number, ...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
    keySizes: [string, string, string, string, string, string];
  };
};

export const styled = baseStyled as ThemedStyledInterface<Theme>;
