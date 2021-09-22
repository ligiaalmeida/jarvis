export type TypeTimeDisplayFormat =
  | 'DD:HH:MM:SS'
  | 'DD:HH:MM'
  | 'DD:MM:SS'
  | 'HH:MM:SS'
  | 'HH:MM'
  | 'MM:SS';

export type TimeFormatArgs = {
  time: number;
  displayFormat: TypeTimeDisplayFormat;
  separatorHour?: string;
  separatorMinute?: string;
  separatorSeconds?: string;
};

export type ChartPropsLabelColor<Chart, TooltipItem> = {
  labelReal: string;
  labelPredicted: string;
  tooltipItem: TooltipItem;
  chart: Chart;
};

export type PageInputFactory<Pathname> = {
  pathname: Pathname;
};
