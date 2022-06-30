import { ChartDataSets } from 'chart.js';

import { EChartList } from 'enums/chartList';

import { theme } from 'styles/theme';

import { ChartType, ChartIdentification, ChartData } from 'types';

const chartConfigDefault: ChartDataSets = {
  label: 'Max',
  borderCapStyle: 'butt',
  borderDashOffset: 0.0,
  borderWidth: 1.5,
  pointBorderWidth: 2,
  pointHoverBorderWidth: 2,
  pointRadius: 2,
  lineTension: 0.2,
  pointHoverRadius: 5,
  pointHitRadius: 10,
  backgroundColor: theme.colors.primary_2,
  borderColor: theme.colors.primary_2,
};

const ChartDatasetsFactory = (
  type: ChartType,
  identification: ChartIdentification,
  data: ChartData,
  perHour: boolean
) => {
  const chartType = type === 'bar' ? 'bar' : 'line';
  let tempExpectedMin: number;
  let tempRealMin: number;
  let expected: number[];
  let real: number[];

  const datasetDefaultA = {
    data: {
      labels: data[identification].datasets.map(
        (dataset) => dataset.key
      ) as string[],
      datasets: [
        {
          ...chartConfigDefault,
          label: 'Predição',
          fill: type !== 'line',
          data: data[identification].datasets.map(
            (dataset) => dataset.predicted
          ),
        },
        {
          ...chartConfigDefault,
          type: chartType,
          label: 'Real',
          fill: type !== 'line',
          backgroundColor: theme.colors.primary_3,
          borderColor: theme.colors.primary_3,
          data: data[identification].datasets.map((dataset) => dataset.value),
        },
      ],
    },
  };

  const datasetDefaultB = {
    data: {
      labels: data[identification].datasets.map(
        (dataset) => dataset.key
      ) as string[],
      datasets: [
        {
          ...chartConfigDefault,
          label: `${perHour ? 'Predição por hora' : 'Predição acumulada'}`,
          fill: type !== 'line',
          backgroundColor: `${
            perHour ? theme.colors.primary_6 : theme.colors.primary_2
          }`,
          borderColor: `${
            perHour ? theme.colors.primary_6 : theme.colors.primary_2
          }`,
          data: data[identification].datasets.map((dataset) =>
            perHour ? dataset.predicted_h : dataset.predicted
          ),
        },
        {
          ...chartConfigDefault,
          type: chartType,
          label: `${perHour ? 'Valor por hora' : 'Valor acumulado'}`,
          fill: type !== 'line',
          backgroundColor: `${
            perHour ? theme.colors.primary_4 : theme.colors.primary_3
          }`,
          borderColor: `${
            perHour ? theme.colors.primary_4 : theme.colors.primary_3
          }`,
          data: data[identification].datasets.map((dataset) =>
            perHour ? dataset.value_h : dataset.value
          ),
        },
      ],
    },
  };

  switch (identification) {
    case EChartList.PRODUCTION_FORECASTING:
      expected = data[identification].datasets.map(
        (dataset) => dataset.predicted
      ) as number[];
      real = data[identification].datasets.map(
        (dataset) => dataset.value
      ) as number[];

      tempExpectedMin = expected.filter((item) => item > 0).length
        ? expected.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;
      tempRealMin = real.filter((item) => item > 0).length
        ? real.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;

      return {
        ...datasetDefaultA,
        minYAxis:
          tempExpectedMin && tempRealMin
            ? Math.min(tempExpectedMin, tempRealMin)
            : Math.max(tempExpectedMin, tempRealMin),
        expected: expected.reduce((a, b) => Math.max(a, b)),
        real: real.reduce((a, b) => Math.max(a, b)),
      };
    case EChartList.FAILURE_FORECASTING:
      expected = data[identification].datasets.map((dataset) =>
        perHour ? Number(dataset.predicted_h) : Number(dataset.predicted)
      ) as number[];
      real = data[identification].datasets.map((dataset) =>
        perHour ? dataset.value_h : dataset.value
      ) as number[];

      tempExpectedMin = expected.filter((item) => item > 0).length
        ? expected.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;
      tempRealMin = real.filter((item) => item > 0).length
        ? real.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;

      return {
        ...datasetDefaultB,
        minYAxis:
          tempExpectedMin && tempRealMin
            ? Math.min(tempExpectedMin, tempRealMin)
            : Math.max(tempExpectedMin, tempRealMin),
        expected: expected
          .filter((item) => !isNaN(Number(item)))
          .reduce((a, b) => Math.max(a, b)),
        real: real.reduce((a, b) => Math.max(a, b)),
      };
    case EChartList.STOPPAGE_FORECASTING:
      expected = data[identification].datasets.map((dataset) =>
        perHour ? dataset.predicted_h : dataset.predicted
      ) as number[];
      real = data[identification].datasets.map((dataset) =>
        perHour ? dataset.value_h : dataset.value
      ) as number[];

      tempExpectedMin = expected.filter((item) => item > 0).length
        ? expected.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;
      tempRealMin = real.filter((item) => item > 0).length
        ? real.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;

      return {
        ...datasetDefaultB,
        minYAxis:
          tempExpectedMin && tempRealMin
            ? Math.min(tempExpectedMin, tempRealMin)
            : Math.max(tempExpectedMin, tempRealMin),
        expected: expected.reduce((a, b) => Math.max(a, b)),
        real: real.reduce((a, b) => Math.max(a, b)),
      };
    case EChartList.TAKT_PER_STATION:
      expected = data[identification].datasets.map(
        (dataset) => dataset.avg_takt
      ) as number[];
      real = data[identification].datasets.map(
        (dataset) => dataset.current_takt
      ) as number[];

      tempExpectedMin = expected.filter((item) => item > 0).length
        ? expected.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;
      tempRealMin = real.filter((item) => item > 0).length
        ? real.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;

      return {
        minYAxis:
          tempExpectedMin && tempRealMin
            ? Math.min(tempExpectedMin, tempRealMin)
            : Math.max(tempExpectedMin, tempRealMin),
        expected: expected.reduce((a, b) => Math.max(a, b)),
        real: real.reduce((a, b) => Math.max(a, b)),
        minYPHAxis: 0,
        expectedPH: 0,
        realPH: 0,
        data: {
          labels: [
            '',
            ...data[identification].datasets.map((dataset) => dataset.label),
            '',
          ],
          datasets: [
            {
              ...chartConfigDefault,
              label: 'Takt Médio',
              fill: !(type !== 'line'),
              backgroundColor: theme.colors.primary_4,
              borderColor: theme.colors.primary_4,
              data: [
                null,
                ...data[identification].datasets.map(
                  (dataset) => dataset.avg_takt
                ),
                null,
              ],
            },
            {
              ...chartConfigDefault,
              type: chartType,
              label: 'Takt Realizado',
              categoryPercentage: 0.7,
              fill: type !== 'line',
              backgroundColor: theme.colors.secondary_2,
              hoverBackgroundColor: theme.colors.secondary_1,
              borderColor: theme.colors.secondary_2,
              hoverBorderColor: theme.colors.secondary_1,
              data: [
                null,
                ...data[identification].datasets.map(
                  (dataset) => dataset.current_takt
                ),
                null,
              ],
            },
          ],
        },
      };
    case EChartList.STOPPAGE_PER_STATION:
      expected = data[identification].datasets.map(
        (dataset) => dataset.predicted
      ) as number[];
      real = data[identification].datasets.map(
        (dataset) => dataset.value
      ) as number[];

      tempExpectedMin = expected.filter((item) => item > 0).length
        ? expected.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;
      tempRealMin = real.filter((item) => item > 0).length
        ? real.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;

      return {
        minYAxis:
          tempExpectedMin && tempRealMin
            ? Math.min(tempExpectedMin, tempRealMin)
            : Math.max(tempExpectedMin, tempRealMin),
        expected: expected.reduce((a, b) => Math.max(a, b)),
        real: real.reduce((a, b) => Math.max(a, b)),
        minYPHAxis: 0,
        expectedPH: 0,
        realPH: 0,
        data: {
          labels: [
            '',
            ...data[identification].datasets.map((dataset) => dataset.label),
            '',
          ],
          datasets: [
            {
              ...chartConfigDefault,
              type: chartType,
              label: 'Predição',
              categoryPercentage: 0.7,
              fill: true,
              backgroundColor: theme.colors.grey_9,
              hoverBackgroundColor: theme.colors.grey_1,
              borderColor: theme.colors.grey_9,
              hoverBorderColor: theme.colors.grey_1,
              data: [
                null,
                ...data[identification].datasets.map(
                  (dataset) => dataset.predicted
                ),
                null,
              ],
            },
            {
              ...chartConfigDefault,
              type: chartType,
              label: 'Real',
              categoryPercentage: 0.7,
              fill: true,
              backgroundColor: theme.colors.primary_4,
              hoverBackgroundColor: theme.colors.tertiary_1,
              borderColor: theme.colors.primary_4,
              hoverBorderColor: theme.colors.tertiary_1,
              data: [
                null,
                ...data[identification].datasets.map(
                  (dataset) => dataset.value
                ),
                null,
              ],
            },
          ],
        },
      };
    case EChartList.FAILURE_PER_STATION:
      expected = data[identification].datasets.map((dataset) =>
        Number(dataset.predicted)
      );
      real = data[identification].datasets.map((dataset) =>
        Number(dataset.value)
      );

      tempExpectedMin = expected.filter((item) => item > 0).length
        ? expected.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;
      tempRealMin = real.filter((item) => item > 0).length
        ? real.filter((item) => item > 0).reduce((a, b) => Math.min(a, b))
        : 0;

      return {
        minYAxis:
          tempExpectedMin && tempRealMin
            ? Math.min(tempExpectedMin, tempRealMin)
            : Math.max(tempExpectedMin, tempRealMin),
        expected: expected.reduce((a, b) => Math.max(a, b)),
        real: real.reduce((a, b) => Math.max(a, b)),
        minYPHAxis: 0,
        expectedPH: 0,
        realPH: 0,
        data: {
          labels: [
            '',
            ...data[identification].datasets.map((dataset) => dataset.label),
            '',
          ],
          datasets: [
            {
              ...chartConfigDefault,
              type: chartType,
              label: 'Predição',
              categoryPercentage: 0.7,
              fill: true,
              backgroundColor: theme.colors.grey_9,
              hoverBackgroundColor: theme.colors.grey_1,
              borderColor: theme.colors.grey_9,
              hoverBorderColor: theme.colors.grey_1,
              data: [
                null,
                ...data[identification].datasets.map(
                  (dataset) => dataset.predicted
                ),
                null,
              ],
            },
            {
              ...chartConfigDefault,
              type: chartType,
              label: 'Real',
              categoryPercentage: 0.7,
              fill: true,
              backgroundColor: theme.colors.red_2,
              hoverBackgroundColor: theme.colors.red_1,
              borderColor: theme.colors.red_2,
              hoverBorderColor: theme.colors.red_1,
              data: [
                null,
                ...data[identification].datasets.map(
                  (dataset) => dataset.value
                ),
                null,
              ],
            },
          ],
        },
      };
    default:
      return { error: true };
  }
};

export default ChartDatasetsFactory;
