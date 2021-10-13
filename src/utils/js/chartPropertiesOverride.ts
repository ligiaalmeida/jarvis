import Chart from 'chart.js';
import { timeFormat } from '.';
import { theme } from 'styles/theme';

export const overrideLabelCustom = (
  tooltipItem: Chart.ChartTooltipItem,
  data: Chart.ChartData
): string | string[] => {
  let meta: Chart.ChartDataSets = { label: '' };
  let time = '';

  if (data && data.datasets)
    meta = data.datasets[tooltipItem.datasetIndex as number];

  time = timeFormat({
    time: tooltipItem.value ? Number(tooltipItem.value) : 0,
    displayFormat: 'HH:MM:SS',
    separatorHour: 'h ',
    separatorMinute: "' ",
    separatorSeconds: '"',
  });

  if (Number(tooltipItem.value) > 0 && Number(tooltipItem.value) < 1) {
    time = tooltipItem.value ? tooltipItem.value : '0';
  }

  return `${meta?.label}: ${time}`;
};

export const overrideLabelColorSimple = (
  tooltipItem: Chart.ChartTooltipItem,
  { config: { data } }: Chart
): Chart.ChartTooltipLabelColor => {
  let color: Chart.ChartColor | string = '';

  if (data && data.datasets)
    color = data.datasets[tooltipItem.datasetIndex as number]
      .backgroundColor as Chart.ChartColor;

  return {
    backgroundColor: color,
    borderColor: 'transparent',
  };
};

export const overrideLabelColor = (
  tooltipItem: Chart.ChartTooltipItem,
  chart: Chart,
  labelReal: string,
  labelPredicted: string
): Chart.ChartTooltipLabelColor => {
  let color: Chart.ChartColor | string = '';

  if (chart.data && chart.data.datasets) {
    const meta = chart.data.datasets[tooltipItem.datasetIndex as number];

    switch (meta.label) {
      case labelReal:
        color = theme.colors.primary_4;
        break;
      case labelPredicted:
        color = theme.colors.primary_2;
        break;
      default:
        color = meta.backgroundColor as Chart.ChartColor;
    }
  }

  return {
    backgroundColor: color,
    borderColor: 'transparent',
  };
};

export const overrideTitleTooltip = (
  item: Chart.ChartTooltipItem[],
  title: string
): string | string[] => `${title} ${item[0].label}`;
