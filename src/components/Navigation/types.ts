import { Pathname, ModeView } from 'types';

/*= -=-=-=-=-= COMPONENT =-=-=-=-=-= */

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */
export type ContainerHeaderProps = {
  toggleNavigation: boolean;
  modeView?: ModeView | string;
  page: Pathname;
  height?: number;
};

export type CalendarProps = {
  route?: boolean;
};
