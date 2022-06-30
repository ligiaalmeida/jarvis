import { Pages } from 'types';

export type ChartContainer = {
  chartHeight: number;
  page?: Pages;
  children?: React.ReactNode;
};
