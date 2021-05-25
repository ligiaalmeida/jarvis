import { css } from 'styled-components';

import { SizesBreakpoints } from 'types';
import sizes from './sizes';

const screens: SizesBreakpoints = {
  xs: (...args: StyledIFlattenSimpleInterpolation) => css({}, ...args),
  sm: (...args: StyledIFlattenSimpleInterpolation) => css({}, ...args),
  md: (...args: StyledIFlattenSimpleInterpolation) => css({}, ...args),
  lg: (...args: StyledIFlattenSimpleInterpolation) => css({}, ...args),
  xl: (...args: StyledIFlattenSimpleInterpolation) => css({}, ...args),
  xxl: (...args: StyledIFlattenSimpleInterpolation) => css({}, ...args),
};

export const breakpoints = (size: 'min' | 'max') =>
  (Object.keys(sizes) as Array<keyof typeof sizes>).reduce((acc, label) => {
    acc[label] = (...args: StyledIFlattenSimpleInterpolation) => {
      return css`
        @media (${size}-width: ${size === 'min' ? sizes[label].min : sizes[label].max}) {
          ${css({}, ...args)};
        }
      `;
    };
    return acc;
  }, screens);

export const breakpointCustom = (type: 'min' | 'max', value: number, ...styles: StyledIFlattenSimpleInterpolation) => {
  return css`
    @media (${type}-width: ${value}px) {
      ${css({}, ...styles)};
    }
  `;
};
