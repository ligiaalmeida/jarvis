import { ActiveFailList, Stations } from './PayloadData';

export type ChartProps = {
  type: ChartType;
  data: ChartData;
  identification: ChartIdentification;
  expectedTakt?: number;
};

export type SwitchChartView = 0 | 1;
export type SwitchTabView = 0 | 1 | 2;

export type ChartType =
  | 'line'
  | 'bar'
  | 'horizontalBar'
  | 'radar'
  | 'doughnut'
  | 'polarArea'
  | 'bubble'
  | 'pie'
  | 'scatter';

export type DatasetChart = {
  key?: string[];
  value?: number[];
  predicted?: number[];
  label?: string[];
  duration?: number[];
  current_takt?: number[];
  avg_takt?: number[];
};

export type Dataset = {
  key?: string;
  value?: string | number | null;
  predicted?: number | string;
  value_h?: string | number | null;
  predicted_h?: number | string;
  label?: string;
  current_takt?: number | string;
  avg_takt?: number | string;
};

export type ChartItem = {
  label: string;
  datasets: Dataset[];
};

export type UDynamicProperties = {
  [key: string]: React.ReactNode;
};

export type ChartIdentification =
  | 'production_forecasting'
  | 'failure_forecasting'
  | 'stoppage_forecasting'
  | 'takt_per_station'
  | 'stoppage_per_station'
  | 'failure_per_station';

export type ChartData = {
  production_forecasting: ChartItem;
  failure_forecasting: ChartItem;
  stoppage_forecasting: ChartItem;
  takt_per_station: ChartItem;
  stoppage_per_station: ChartItem;
  failure_per_station: ChartItem;
};

export type StationWithBiggestFailure = {
  id?: number | string;
  label: string;
  num_prod: number;
  baumuster: string;
  active_fail_list: ActiveFailList;
};

export type StationsRows = Array<Stations[][]>;

export type ColorStatusType = 'default' | 'empty' | 'error';

export type GravityFaults =
  | 'default'
  | 'gravity0'
  | 'gravity1'
  | 'gravity2'
  | 'gravity3'
  | 'gravity100'
  | 'gravity96'
  | 'gravity95'
  | 'gravity93'
  | 'gravity92'
  | 'gravity91'
  | 'gravity90'
  | 'gravity85'
  | 'gravity80'
  | 'gravity70'
  | 'gravity60';
