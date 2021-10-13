import { css, FlattenSimpleInterpolation } from 'styled-components';
import { Sizes } from 'types';

const sizes = {
  sm: { min: 640, max: 639 },
  md: { min: 768, max: 767 },
  lg: { min: 1024, max: 1023 },
  xl: { min: 1280, max: 1279 },
  xxl: { min: 1800, max: 1799 },
};

const screens: Sizes = {
  sm: (...args: FlattenSimpleInterpolation) => css({}, ...args),
  md: (...args: FlattenSimpleInterpolation) => css({}, ...args),
  lg: (...args: FlattenSimpleInterpolation) => css({}, ...args),
  xl: (...args: FlattenSimpleInterpolation) => css({}, ...args),
  xxl: (...args: FlattenSimpleInterpolation) => css({}, ...args),
};

const mediaDefault = (size: 'min' | 'max') =>
  (Object.keys(sizes) as Array<keyof typeof sizes>).reduce((acc, label) => {
    acc[label] = (...args: FlattenSimpleInterpolation) => {
      return css`
        @media (${size}-width: ${size === 'min'
            ? sizes[label].min
            : sizes[label].max}px) {
          ${css({}, ...args)};
        }
      `;
    };
    return acc;
  }, screens);

const mediaCustom = (
  [type, value]: [string, number],
  ...args: FlattenSimpleInterpolation
) => {
  return css`
    @media (${type}-width: ${value}px) {
      ${css({}, ...args)};
    }
  `;
};

export { mediaDefault, mediaCustom };
