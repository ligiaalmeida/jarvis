import { ChartIdentification, SwitchChartView, ChartType } from 'types';

/*= -=-=-=-=-= COMPONENT =-=-=-=-=-= */
export type ChartOptionsFactoryProps = {
  identification: ChartIdentification;
  viewType: SwitchChartView;
  expectedTakt?: number;
  options: {
    minYAxis: number;
    expected: number;
    real: number;
  };
};

export interface ChartFactoryProps<Data> extends ChartOptionsFactoryProps {
  type: ChartType;
  data: Data;
  identification: ChartIdentification;
  viewType: SwitchChartView;
}

export interface setDatasetChartType {
  data: ChartJsChartData | null;
  expected: number;
  real: number;
  minYAxis: number;
}

/*= -=-=-=-=-= STYLES =-=-=-=-=-= */

export type ChartViewButtonsProps = {
  selected: number;
};

export type ExpectedAndRealProps = {
  identification: ChartIdentification;
  view: boolean;
};
