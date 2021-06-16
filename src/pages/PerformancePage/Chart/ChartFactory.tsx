import { ChartData, ChartOptions } from 'chart.js';
import { defaults, Line } from 'react-chartjs-2';
import merge from 'lodash.merge';

import { EChartList } from 'enums/chartList';

import * as Types from '../types';

import 'chartjs-plugin-style';

import ChartOptionsFactory from './ChartOptionsFactory';

merge(defaults, {
  global: {
    defaultFontFamily: "'DaimlerRegular', sans-serif",
  },
});

export const legendDefault = {
  display: false,
};

const ChartFactory = ({
  data,
  identification = EChartList.PRODUCTION_FORECASTING,
  options,
  viewType,
  expectedTakt = 15,
}: Types.ChartFactoryProps<ChartData>) => {
  switch (identification) {
    case EChartList.PRODUCTION_FORECASTING:
      return (
        <Line
          data={data as ChartData}
          options={
            ChartOptionsFactory({
              identification,
              viewType,
              options,
              expectedTakt,
            }) as ChartOptions
          }
          legend={legendDefault}
        />
      );
    case EChartList.FAILURE_FORECASTING:
      return (
        <Line
          data={data as ChartData}
          options={
            ChartOptionsFactory({
              identification,
              viewType,
              options,
              expectedTakt,
            }) as ChartOptions
          }
          legend={legendDefault}
        />
      );
    case EChartList.STOPPAGE_FORECASTING:
      return (
        <Line
          data={data as ChartData}
          options={
            ChartOptionsFactory({
              identification,
              viewType,
              options,
              expectedTakt,
            }) as ChartOptions
          }
          legend={legendDefault}
        />
      );
    case EChartList.TAKT_PER_STATION:
      return (
        <Line
          redraw
          height={80}
          data={data as ChartData}
          options={
            ChartOptionsFactory({
              identification,
              viewType,
              options,
              expectedTakt,
            }) as ChartOptions
          }
          legend={legendDefault}
          plugins={[
            {
              style: { enable: true },
            },
          ]}
        />
      );
    case EChartList.STOPPAGE_PER_STATION:
      return (
        <Line
          redraw
          height={80}
          data={data as ChartData}
          options={
            ChartOptionsFactory({
              identification,
              viewType,
              options,
              expectedTakt,
            }) as ChartOptions
          }
          legend={legendDefault}
          plugins={[
            {
              style: { enable: true },
            },
          ]}
        />
      );
    case EChartList.FAILURE_PER_STATION:
      return (
        <Line
          redraw
          height={80}
          data={data as ChartData}
          options={
            ChartOptionsFactory({
              identification,
              viewType,
              options,
              expectedTakt,
            }) as ChartOptions
          }
          legend={legendDefault}
          plugins={[
            {
              style: { enable: true },
            },
          ]}
        />
      );
    default:
      return <div>Loading...</div>;
  }
};

export default ChartFactory;
