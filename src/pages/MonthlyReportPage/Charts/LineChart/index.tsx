import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import * as chartjs from 'chart.js';
import { lighten } from '@material-ui/core';
import ContentLoader from 'react-content-loader';

import Chart, { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartData } from 'react-chartjs-2';
import * as Types from 'types';

import { theme } from 'styles/theme';
import {
  sortData,
  overrideLabelCustom,
  overrideLabelColor,
  overrideTitleTooltip,
} from 'utils/js';

import LabelItemChart from 'components/LabelItemChart';
import Calendar from 'components/Icons/Calendar';
import ChartMonitor from 'components/ChartMonitor';

import { StateMapToPropsGlobal } from 'types';

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
  borderWidth: 2,
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
  hover: {
    mode: 'index',
    intersect: false,
  },
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: theme.colors.grey_6,
        },
        ticks: {
          beginAtZero: true,
          padding: 16,
          fontSize: 12,
          stepSize: 0,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: theme.colors.grey_6,
        },
        ticks: {
          beginAtZero: true,
          padding: 16,
          fontSize: 12,
        },
      },
    ],
  },
  aspectRatio: 1,
  responsive: true,
  maintainAspectRatio: true,
};

const LineChart = ({
  data,
  title,
  type,
  labels,
  date,
}: Types.LineChartsProps) => {
  const [values, setValues] = useState<{
    keys: number[];
    value: number[];
    minimum: number[];
    medium: number[];
    maximum: number[];
    predicted?: number[];
  }>(null!);

  const monthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) =>
      state.monthlyReportPage
  );

  useEffect(() => {
    if (data) {
      const datasetsSort = sortData({ data });

      if (type === 'daily_production' || type === 'daily_deviation') {
        setValues({
          keys: datasetsSort.map((item) => item.key),
          minimum: datasetsSort.map((item) => +item.minimum),
          medium: datasetsSort.map((item) => +item.medium),
          maximum: datasetsSort.map((item) => +item.maximum),
          value: datasetsSort.map((item) => Math.ceil(+item.value)),
          predicted: datasetsSort.map((item) => Math.ceil(+item.predicted!)),
        });
      } else {
        setValues({
          keys: datasetsSort.map((item) => item.key),
          minimum: datasetsSort.map((item) => +item.minimum),
          medium: datasetsSort.map((item) => +item.medium),
          maximum: datasetsSort.map((item) => +item.maximum),
          value: datasetsSort.map((item) => Math.ceil(+item.value)),
        });
      }
    }
  }, [data, data.datasets, type]);

  const datasets: ChartData<chartjs.ChartData> = {
    labels: values ? ['', ...values.keys, ''] : [],
    datasets: [
      {
        ...chartConfigDefault,
        label: labels?.minimum,
        type: 'line',
        fill: false,
        order: 0,
        pointRadius: 0,
        backgroundColor: theme.colors.grey_2,
        borderColor: theme.colors.grey_2,
        pointBorderWidth: 1,
        pointBorderColor: lighten(theme.colors.grey_2, 0.65),
        data: values ? [null, ...values.minimum, null] : [],
      },
      {
        ...chartConfigDefault,
        label: labels?.medium,
        type: 'line',
        fill: false,
        order: 1,
        pointRadius: 0,
        backgroundColor: theme.colors.primary_1,
        borderColor: theme.colors.primary_1,
        pointBorderWidth: 1,
        pointBorderColor: lighten(theme.colors.primary_1, 0.5),
        data: values ? [null, ...values.medium, null] : [],
      },
      {
        ...chartConfigDefault,
        label: labels?.maximum,
        type: 'line',
        fill: false,
        order: 2,
        pointRadius: 0,
        backgroundColor: theme.colors.secondary_1,
        borderColor: theme.colors.secondary_1,
        pointBorderWidth: 1,
        pointBorderColor: lighten(theme.colors.secondary_1, 0.35),
        data: values ? [null, ...values.maximum, null] : [],
      },
      {
        ...chartConfigDefault,
        label: labels?.value,
        fill: false,
        order: 4,
        type: 'bar',
        backgroundColor: 'rgba(110, 160, 70, 0.6)',
        borderColor: 'rgba(110, 160, 70, 0.6)',
        barThickness: 20,
        borderWidth: 0,
        hoverBackgroundColor: theme.colors.primary_4,
        pointBorderWidth: 1,
        data: values ? [null, ...values.value, null] : [],
      },

      type === 'daily_production' || type === 'daily_deviation'
        ? {
            ...chartConfigDefault,
            label: labels?.predicted,
            fill: false,
            order: 3,
            type: 'bar',
            backgroundColor: 'rgba(80, 151, 171, 0.8)',
            borderColor: 'rgba(80, 151, 171, 0.8)',
            barThickness: 20,
            borderWidth: 0,
            hoverBackgroundColor: theme.colors.primary_2,
            pointBorderWidth: 1,
            data:
              values && values.predicted
                ? [null, ...values.predicted, null]
                : [],
          }
        : {},
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
        labelColor: (tooltipItem: Chart.ChartTooltipItem, chart: Chart) =>
          overrideLabelColor(
            tooltipItem,
            chart,
            labels?.value,
            labels?.predicted as string
          ),
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
          <div className="kpi-charts__header">
            <h3>{title}</h3>
            <div>
              <Calendar fill={theme.colors.primary_1} />
              <span>{date}</span>
            </div>
          </div>
          <S.Labels>
            <LabelItemChart
              label={labels?.value}
              colorTag={theme.colors.primary_4}
              description={
                texts.charts.daily_production.tooltips.daily_production.pt_br
              }
            />

            {(type === 'daily_production' || type === 'daily_deviation') &&
              labels.predicted && (
                <LabelItemChart
                  label={labels.predicted}
                  colorTag={theme.colors.primary_2}
                  description={
                    type === 'daily_production'
                      ? texts.charts.daily_production.tooltips
                          .expected_daily_production.pt_br
                      : texts.charts.daily_deviation.tooltips
                          .expected_daily_deviation.pt_br
                  }
                />
              )}

            <LabelItemChart
              label={labels.minimum}
              colorTag={theme.colors.grey_2}
              description={texts.charts[type].tooltips.minimum.pt_br}
            />
            <LabelItemChart
              label={labels.medium}
              colorTag={theme.colors.primary_1}
              description={texts.charts[type].tooltips.medium.pt_br}
            />
            <LabelItemChart
              label={labels.maximum}
              colorTag={theme.colors.secondary_1}
              description={texts.charts[type].tooltips.maximum.pt_br}
            />
          </S.Labels>
          <ChartMonitor
            page="monthlyReport"
            labels={{
              yAxis:
                type === 'line_stoppage_time'
                  ? texts.charts.labels.yAxis.time.pt_br
                  : texts.charts.labels.yAxis.quantity.pt_br,
              xAxis: texts.charts.labels.xAxis.days.pt_br,
            }}
          >
            <Line
              redraw
              data={datasets}
              width={1000}
              height={250}
              options={
                type === 'line_stoppage_time'
                  ? {
                      ...customTooltip,
                      tooltips: {
                        ...customTooltip.tooltips,
                        callbacks: {
                          ...customTooltip.tooltips?.callbacks,
                          label: overrideLabelCustom,
                        },
                      },
                    }
                  : { ...customTooltip }
              }
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

const lineChartPropsAreEqual = <T extends Types.LineChartsProps>(
  prevProps: Readonly<ReactPropsWithChildren<T>>,
  nextProps: Readonly<ReactPropsWithChildren<T>>
) =>
  prevProps.data?.datasets[0]?.value === nextProps.data?.datasets[0]?.value &&
  prevProps.data?.datasets[0]?.medium === nextProps.data?.datasets[0]?.medium &&
  prevProps.data?.datasets[0]?.maximum ===
    nextProps.data?.datasets[0]?.maximum &&
  prevProps.date === nextProps.date;

export default React.memo(LineChart, lineChartPropsAreEqual);
