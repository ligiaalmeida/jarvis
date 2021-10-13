import { HTMLAttributes } from 'react';
import { Direction, Grid, SpacesCSS } from 'types';

export type GridSizes = {
  /**
   * Tamanho do container.
   *
   * Tipos aceitos: **_1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16_**
   */
  xs?: Grid;
  /**
   * Tamanho do container.
   *
   * Tipos aceitos: **_1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16_**
   */
  sm?: Grid;
  /**
   * Tamanho do container.
   *
   * Tipos aceitos: **_1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16_**
   */
  md?: Grid;
  /**
   * Tamanho do container.
   *
   * Tipos aceitos: **_1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16_**
   */
  lg?: Grid;
  /**
   * Tamanho do container.
   *
   * Tipos aceitos: **_1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16_**
   */
  xl?: Grid;
  /**
   * Tamanho do container.
   *
   * Tipos aceitos: **_1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16_**
   */
  xxl?: Grid;
};

export type HTMLAttr = GridSizes &
  Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick' | 'id'>;

export type Spaces = {
  xs?: SpacesCSS;
  sm?: SpacesCSS;
  md?: SpacesCSS;
  lg?: SpacesCSS;
  xl?: SpacesCSS;
  xxl?: SpacesCSS;
};

export type ContainerProps = {
  /**
   * Insira a direção de como os elementos filhos irão se comportar.
   *
   * Tipos aceitos: **_'row' | 'row-reverse' | 'column' | 'column-reverse'_**
   *
   * Ex: **_flexDirection="row"_**
   */
  flexDirection?: Direction;
  /**
   * Insira o **padding** do container adicionando as quebras aceitas no grid, *xs | sm | md | lg | xl | xxl*.
   *
   * Tipos aceitos: **_{ xs: [number, number, number, number, 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'] ... }_**
   *
   * Ex: **_padding={{ xs: [0, 0, 0, 0, 'px'] }}_**
   */
  padding?: Spaces;
  /**
   * Insira o **margin** do container adicionando as quebras aceitas no grid, *xs | sm | md | lg | xl | xxl*.
   *
   * Tipos aceitos: **_{ xs: [number, number, number, number, 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'] ... }_**
   *
   * Ex: **_margin={{ xs: [0, 0, 0, 0, 'px'] }}_**
   */
  margin?: Spaces;
} & HTMLAttr;

export type ContentProps = {
  flexDirection: Direction;
  padding: Spaces;
  margin: Spaces;
} & HTMLAttr;
