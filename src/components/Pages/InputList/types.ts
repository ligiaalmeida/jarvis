import { ModeView, Pathname } from 'types';
import { SimpleInterpolation } from 'styled-components';

export type InputListProps = {
  pathname: Pathname;
} & StyleHeaderProps;

export type StyleHeaderProps = {
  padding: string;
  invertedElement?: boolean;
  customCSSHeader?: SimpleInterpolation;
  customCSSInputList?: SimpleInterpolation;
};

export type InputListStyleProps = {
  page: Pathname;
  toggleNavigation: boolean;
  modeView: ModeView;
};

export type CalendarProps = {
  route?: boolean;
  pathname: Pathname;
};
