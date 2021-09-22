import { useEffect, useState } from 'react';
import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';
import ContentLoader from 'react-content-loader';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { lighten } from 'polished';

import {
  displayDate,
  overrideLabelCustom,
  overrideTitleTooltip,
} from 'utils/js';

import Chart, { ChartDataSets, ChartOptions } from 'chart.js';

import { theme } from 'styles/theme';
import { sortData } from 'utils/js/sortData';

import LabelItemChart from 'components/LabelItemChart';
import Calendar from 'components/Icons/Calendar';
import ChartMonitor from 'components/ChartMonitor';

import { StateMapToPropsGlobal } from 'types';
import * as Types from '../../types';

import texts from '../../texts';
import * as S from './styles';

const chartConfigDefault: ChartDataSets = {
  label: 'Max',
  borderCapStyle: 'butt',
  borderDashOffset: 0.0,
  pointBorderWidth: 2,
  pointHoverBorderWidth: 2,
  pointRadius: 2,
  lineTension: 0.2,
  pointHoverRadius: 5,
  pointHitRadius: 10,
  backgroundColor: theme.colors.primary_2,
  borderColor: theme.colors.primary_2,
  categoryPercentage: 0.7,
  borderWidth: 1,
};

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

const options: ChartOptions = {
  tooltips: {
    ...(shadowStyle as ChartOptions),
    bodySpacing: 8,
    titleFontFamily: "'DaimlerBold', sans-serif",
    titleFontSize: 14,
    titleFontColor: theme.colors.grey_3,
    titleMarginBottom: 8,
    xPadding: 16,
    yPadding: 16,
    bodyFontColor: theme.colors.grey_2,
    backgroundColor: theme.colors.grey_8,
    borderWidth: 0.5,
    borderColor: theme.colors.grey_7,
    mode: 'index',
    position: 'cursor',
    intersect: false,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: theme.colors.grey_6,
        },
        ticks: {
          autoSkip: false,
          beginAtZero: true,
          padding: 16,
          fontSize: 12,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: theme.colors.grey_6,
        },
        ticks: {
          autoSkip: false,
          beginAtZero: true,
          padding: 16,
          fontSize: 12,
        },
      },
    ],
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
  maintainAspectRatio: true,
};

const GeneralChart = ({ data, title, labels }: Types.GeneralChartProps) => {
  const [date, setDate] = useState('');
  const [values, setValues] = useState<{
    keys: number[];
    minimum: number[];
    medium: number[];
    maximum: number[];
  }>(null!);

  const monthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) =>
      state.monthlyReportPage
  );

  useEffect(() => {
    if (data) {
      const datasetsSort = sortData({ data });

      setValues({
        keys: datasetsSort.map((item) => item.key),
        minimum: datasetsSort.map((item) => Math.ceil(+item.minimum)),
        medium: datasetsSort.map((item) => Math.ceil(+item.medium)),
        maximum: datasetsSort.map((item) => Math.ceil(+item.maximum)),
      });

      setDate(
        displayDate({
          date: monthlyReportPage.params.date,
          format: 'MMMM/yyyy',
        })
      );
    }
  }, [data]);

  const datasets: ChartData<chartjs.ChartData> = {
    labels: values ? ['', ...values.keys, ''] : [],
    datasets: [
      {
        ...chartConfigDefault,
        label: labels?.minimum,
        type: 'bar',
        order: 1,
        borderWidth: 0,
        backgroundColor: theme.colors.grey_7,
        hoverBackgroundColor: theme.colors.grey_3,
        pointBorderWidth: 1,
        data: values ? [null, ...values.minimum, null] : [],
      },
      {
        ...chartConfigDefault,
        label: labels?.medium,
        type: 'line',
        fill: false,
        order: 0,
        backgroundColor: theme.colors.secondary_1,
        borderColor: theme.colors.secondary_1,
        borderWidth: 2,
        hoverBackgroundColor: lighten(0.1, theme.colors.secondary_1),
        hoverBorderColor: lighten(0.2, theme.colors.secondary_1),
        data: values ? [null, ...values.medium, null] : [],
      },
      {
        ...chartConfigDefault,
        label: labels?.maximum,
        type: 'bar',
        order: 2,
        borderWidth: 0,
        backgroundColor: theme.colors.primary_4,
        hoverBackgroundColor: theme.colors.tertiary_1,
        borderColor: theme.colors.primary_4,
        hoverBorderColor: theme.colors.tertiary_1,
        data: values ? [null, ...values.maximum, null] : [],
      },
    ],
  };

  Chart.Tooltip.positioners.cursor = (_chartElements, coordinates) => {
    return coordinates;
  };

  const customTooltip: ChartOptions = {
    ...options,
    tooltips: {
      ...options.tooltips,
      callbacks: {
        labelColor(
          tooltipItem: Chart.ChartTooltipItem,
          { config: { data } }: Chart
        ): Chart.ChartTooltipLabelColor {
          let color: Chart.ChartColor | string = '';

          if (data && data.datasets)
            color = data.datasets[tooltipItem.datasetIndex as number]
              .backgroundColor as Chart.ChartColor;

          return {
            backgroundColor: color,
            borderColor: 'transparent',
          };
        },
        label: overrideLabelCustom,
        title: (item: Chart.ChartTooltipItem[]): string | string[] =>
          overrideTitleTooltip(item, texts.charts.tooltips.labels.title.pt_br),
      },
    },
  };

  return (
    <S.Container>
      {monthlyReportPage.loading && (
        <ContentLoader
          viewBox="0 0 1250 708"
          animate
          backgroundColor="#EFF3F8"
          foregroundColor="#D8DDE6"
        >
          <rect width="113" height="28" rx="2" fill="#C4C4C4" />
          <rect y="107" width="110" height="17" fill="#C4C4C4" />
          <rect x="1" y="143" width="1249" height="500" rx="4" fill="#C4C4C4" />
          <rect y="54" width="16" height="16" rx="8" fill="#C4C4C4" />
          <rect x="25" y="56" width="70" height="13" rx="2" fill="#C4C4C4" />
          <rect x="591" y="695" width="70" height="13" rx="2" fill="#C4C4C4" />
          <rect x="139" y="54" width="16" height="16" rx="8" fill="#C4C4C4" />
          <rect x="164" y="56" width="70" height="13" rx="2" fill="#C4C4C4" />
          <rect x="269" y="54" width="16" height="16" rx="8" fill="#C4C4C4" />
          <rect x="294" y="56" width="70" height="13" rx="2" fill="#C4C4C4" />
        </ContentLoader>
      )}

      {data && !monthlyReportPage.loading && (
        <>
          <div className="current-takt__header">
            <h3>{title}</h3>
            <div>
              <Calendar fill={theme.colors.primary_1} />
              <span>{date}</span>
            </div>
          </div>
          <S.Labels>
            <LabelItemChart
              label={labels.minimum}
              colorTag={theme.colors.grey_7}
              description={texts.charts.current_takt.tooltips.minimum.pt_br}
            />
            <LabelItemChart
              label={labels.medium}
              colorTag={theme.colors.secondary_1}
              description={texts.charts.current_takt.tooltips.medium.pt_br}
            />
            <LabelItemChart
              label={labels.maximum}
              colorTag={theme.colors.primary_4}
              description={texts.charts.current_takt.tooltips.maximum.pt_br}
            />
          </S.Labels>
          <ChartMonitor
            page="monthlyReport"
            labels={{
              yAxis: texts.charts.labels.yAxis.time.pt_br,
              xAxis: texts.charts.labels.xAxis.days.pt_br,
            }}
          >
            {console.log('customTooltip >> ', customTooltip)}
            <Line
              redraw
              data={datasets}
              options={customTooltip}
              legend={{ display: false }}
              plugins={[
                {
                  style: { enable: true },
                },
              ]}
            />
          </ChartMonitor>
        </>
      )}
    </S.Container>
  );
};

export default GeneralChart;
