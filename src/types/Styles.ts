import { FlattenSimpleInterpolation } from 'styled-components';

export type BorderStyle =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

export type SpacesCSS =
  | [number, number, number, number, LengthUnits]
  | [number, number, number, LengthUnits]
  | [number, number, LengthUnits];
export type Border = [string, BorderStyle, string];
export type LengthUnits = 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh';
export type BreakpointFunction = (...args: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;
export type GridSizes = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
export type SizesBreakpoints = {
  xs: BreakpointFunction;
  sm: BreakpointFunction;
  md: BreakpointFunction;
  lg: BreakpointFunction;
  xl: BreakpointFunction;
  xxl: BreakpointFunction;
};
export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type Grid = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
export type KeysGrid = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
