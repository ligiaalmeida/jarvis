/*= -=-=-=-=-= COMPONENTS =-=-=-=-=-= */
export type KPIReportProps = {
  marginBottom?: number;
  prefix: string;
  labels: MonthlyReportChartLabels;
  values: {
    minimum: number | string;
    medium: number | string;
    maximum: number | string;
  };
};

export type MonthlyReportChartLabels = {
  chart_title?: string;
  title?: string;
  minimum: string;
  medium: string;
  maximum: string;
};

export type GeneralChartProps = {
  title: string;
  labels: {
    minimum: string;
    medium: string;
    maximum: string;
  };
  data: {
    labels: MonthlyReportChartLabelsCurrentTakt;
    datasets: Omit<MonthlyReportChartDatasets, 'value'>[];
  };
};

export type LineChartsProps = {
  title: string;
  date: string;
  type: 'daily_production' | 'daily_deviation' | 'line_stoppage_time';
  labels: {
    minimum: string;
    medium: string;
    maximum: string;
    value: string;
    predicted?: string;
  };
  data: {
    labels: MonthlyReportChartLabelsLineCharts;
    datasets: MonthlyReportChartDatasets[];
  };
};

export type MonthlyReportChartDatasets = {
  key: number;
  value: number;
  minimum: string | number;
  medium: string | number;
  maximum: string | number;
  predicted?: string | number;
};

export type MonthlyReportChartLabelsCurrentTakt = {
  chart_title: string;
  minimum: string;
  medium: string;
  maximum: string;
};

export type MonthlyReportChartLabelsLineCharts = {
  chart_title: string;
  value: string;
  minimum: string;
  medium: string;
  maximum: string;
};

export type StationSelectedState = {
  area_invasion: StationSelectedItem;
  rfid_fail: StationSelectedItem;
  acc_stop_time: StationSelectedItem;
  avg_takt: StationSelectedItem;
  fail_time: StationSelectedItem;
  stop_time: StationSelectedItem;
};

export type StationSelectedItem = {
  minimum: string;
  medium: string;
  maximum: string;
};

export type KPIPerStationProps<Data> = {
  payload: Data;
};

export type KPIReportItemProps = {
  id: string;
  taktType: TaktTypes;
  title: string;
  value: string | number;
  prefix: string;
  labels: MonthlyReportChartLabels;
};

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */
export type KPIItemProps = {
  taktType: TaktTypes;
  isBorder: boolean;
};

export type TaktTypes = 'max' | 'med' | 'min';

export type ContainerKPIReportProps = {
  marginBottom?: number;
};
