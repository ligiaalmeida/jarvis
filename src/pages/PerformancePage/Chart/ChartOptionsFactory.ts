import Chart, { ChartOptions } from 'chart.js';

import { EChartList } from 'enums/chartList';

import { theme } from 'styles/theme';
import {
  overrideLabelColorSimple,
  overrideLabelCustom,
  overrideTitleTooltip,
} from 'utils/js';

import * as Types from '../types';

export const effectColorsDefault = {
  highlight: 'rgba(255, 255, 255, 0.75)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const shadowStyle = {
  shadowColor: effectColorsDefault.shadow,
  shadowOffsetX: 2,
  shadowOffsetY: 5,
  shadowBlur: 6,
};

const configDefault: ChartOptions = {
  tooltips: {
    ...(shadowStyle as ChartOptions),
    bodySpacing: 8,
    titleFontFamily: "'DaimlerBold', sans-serif",
    titleFontSize: 16,
    titleFontColor: theme.colors.grey_3,
    titleMarginBottom: 8,
    xPadding: 16,
    yPadding: 16,
    bodyFontColor: theme.colors.grey_2,
    bodyFontSize: 14,
    backgroundColor: theme.colors.grey_8,
    borderWidth: 0.5,
    borderColor: theme.colors.grey_7,
    mode: 'index',
    position: 'cursor',
    intersect: false,
  },
  hover: {
    mode: 'index',
    intersect: false,
  },
  legend: {
    display: false,
  },
  aspectRatio: 1,
  responsive: true,
  plugins: {
    pan: {
      enabled: true,
      mode: 'x',
      speed: 10,
      threshold: 10,
    },
    zoom: {
      enabled: true,
      drag: false,
      mode: 'xy',
      speed: 0.01,
      sensitivity: 0.1,
      limits: {
        max: 10,
        min: 0.5,
      },
    },
  },
};

Chart.Tooltip.positioners.cursor = (_chartElements, coordinates) => {
  return coordinates;
};

const ChartOptionsFactory = ({
  identification,
  options,
  viewType,
  expectedTakt,
}: Types.ChartOptionsFactoryProps): ChartOptions | boolean => {
  const ticksMax =
    viewType === 0
      ? Math.ceil(Math.max(options.expected, options.real) + 1)
      : options.minYAxis < 0.05
      ? 0.05
      : Math.ceil(options.minYAxis + 2);

  const optionDefaultTypeA: ChartOptions = {
    ...(configDefault as ChartOptions),
    maintainAspectRatio: true,
    tooltips: {
      ...configDefault.tooltips,
      mode: 'index',
      intersect: false,
      callbacks: {
        labelColor: overrideLabelColorSimple,
        title: (item: Chart.ChartTooltipItem[]): string | string[] =>
          overrideTitleTooltip(item, 'Hora:'),
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: { zeroLineColor: 'rgba(51, 51, 51, 0.05)' },
          ticks: {
            beginAtZero: true,
            padding: 8,
          },
        },
      ],
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
          },
          gridLines: { zeroLineColor: 'rgba(51, 51, 51, 0.05)' },
          ticks: {
            padding: 8,
            lineHeight: 1.2,
            fontSize: 13,
          },
        },
      ],
    },
  };

  const optionDefaultTypeB: ChartOptions = {
    ...configDefault,
    tooltips: {
      ...configDefault.tooltips,
      intersect: false,
      callbacks: {
        label: overrideLabelCustom,
        labelColor: overrideLabelColorSimple,
      },
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: { zeroLineColor: 'rgba(51, 51, 51, 0.05)' },
          scaleLabel: { display: true },
          ticks: {
            beginAtZero: true,
            fontSize: 13,
            padding: 8,
            max:
              identification === 'takt_per_station' && viewType === 1
                ? expectedTakt
                : ticksMax,
            stepSize:
              viewType === 0
                ? Math.ceil((Math.max(options.expected, options.real) + 1) / 4)
                : Math.ceil((options.minYAxis + 2) / 2.5),
          },
        },
      ],
      xAxes: [
        {
          gridLines: { zeroLineColor: 'rgba(51, 51, 51, 0.05)' },
          scaleLabel: { display: true },
          ticks: {
            autoSkip: true,
            fontSize: 13,
            padding: 8,
          },
        },
      ],
    },
  };

  switch (identification) {
    case EChartList.PRODUCTION_FORECASTING:
      return optionDefaultTypeA;
    case EChartList.FAILURE_FORECASTING:
      return {
        ...optionDefaultTypeA,
        tooltips: {
          ...optionDefaultTypeA.tooltips,
          callbacks: {
            ...optionDefaultTypeA.tooltips?.callbacks,
            label: overrideLabelCustom,
          },
        },
      };
    case EChartList.STOPPAGE_FORECASTING:
      return {
        ...optionDefaultTypeA,
        tooltips: {
          ...optionDefaultTypeA.tooltips,
          callbacks: {
            ...optionDefaultTypeA.tooltips?.callbacks,
            label: overrideLabelCustom,
          },
        },
      };
    case EChartList.TAKT_PER_STATION:
      return optionDefaultTypeB;
    case EChartList.STOPPAGE_PER_STATION:
      return optionDefaultTypeB;
    case EChartList.FAILURE_PER_STATION:
      return optionDefaultTypeB;
    default:
      return false;
  }
};

export default ChartOptionsFactory;
