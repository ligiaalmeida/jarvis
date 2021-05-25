import { css } from 'styled-components';

export const fixed = ({ x = 0, y = 0, yProp = 'top', xProp = 'left' } = {}): StyledIFlattenSimpleInterpolation => css`
  position: fixed;
  ${yProp}: ${y};
  ${xProp}: ${x};
`;

export const Absolute = ({
  x = '-0',
  y = '-0',
  yProp = 'top',
  xProp = 'left',
} = {}): StyledIFlattenSimpleInterpolation => css`
  position: absolute;
  ${yProp}: ${y}%;
  ${xProp}: ${x}%;
  transform: translate(${Number(x.slice(1, 2)) ? `${x}%` : x}, ${Number(y.slice(1, 2)) ? `${y}%` : y});
`;

export const Centralized = (
  addItemToTransform?: StyledIFlattenSimpleInterpolation
): StyledIFlattenSimpleInterpolation => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${addItemToTransform};
`;
