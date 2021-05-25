import { Direction, SpacesCSS } from 'types';
import { HTMLAttributes } from 'react';

export type RowProps = {
  /**
   * Insira a direção de como os elementos filhos irão se comportar.
   *
   * Tipos aceitos: **_'row' | 'row-reverse' | 'column' | 'column-reverse'_**
   *
   * Ex: **_flexDirection="row"_**
   */
  flexDirection?: Direction;
  /**
   * Padding do container.
   *
   * Tipos aceitos: **_{ [number, number, number, number, 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'] }_**
   *
   * Ex: **_padding={[0, 0, 0, 0, 'px']}_**
   */
  padding?: SpacesCSS;
  /**
   * Margem do container.
   *
   * Tipos aceitos: **_{[number, number, number, number, 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh']}_**
   *
   * Ex: **_margin={[0, 0, 0, 0, 'px']}_**
   */
  margin?: SpacesCSS;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick' | 'id'>;
