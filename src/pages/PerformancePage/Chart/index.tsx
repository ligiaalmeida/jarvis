import { useState, useEffect } from 'react';

import { FormControlLabel, Checkbox } from '@material-ui/core';
import ContentLoader from 'react-content-loader';
import 'chartjs-plugin-style';

import { timeFormat } from 'utils/js';

import { EChartList } from 'enums/chartList';

import texts from '../texts';

import ChartFactory from './ChartFactory';
import ChartDatasetsFactory from './ChartDatasetsFactory';

import ChartMonitor from 'components/ChartMonitor';

import { ChartProps, SwitchChartView } from 'types';

import * as S from './styles';

export const Chart = ({
  type = 'bar',
  data,
  identification = EChartList.PRODUCTION_FORECASTING,
  expectedTakt,
}: ChartProps) => {
  const [datasetsChart, setDatasetsChart] = useState<ChartJsChartData>({
    labels: [''],
    datasets: [{}],
  });
  const [minYAxis, setMinYAxis] = useState(0);
  const [expected, setExpected] = useState(120);
  const [real, setReal] = useState(0);

  const [viewType, setViewType] = useState<SwitchChartView>(0);
  const [perHour, setPerHourView] = useState<boolean>(false);
  const [xAxisLabel, setXAxisLabel] = useState<string>('');
  const [predictionCaption, setPredictionCaption] = useState<string>('');
  const [valueCaption, setValueCaption] = useState<string>('');

  useEffect(() => {
    if (
      identification === EChartList.PRODUCTION_FORECASTING ||
      identification === EChartList.FAILURE_FORECASTING ||
      identification === EChartList.STOPPAGE_FORECASTING
    ) {
      setXAxisLabel(texts.charts.labels.xAxis.hour.pt_br);
    }

    if (
      identification === EChartList.TAKT_PER_STATION ||
      identification === EChartList.STOPPAGE_PER_STATION ||
      identification === EChartList.FAILURE_PER_STATION
    ) {
      setXAxisLabel(texts.charts.labels.xAxis.station.pt_br);
    }

    if (
      (identification === EChartList.FAILURE_FORECASTING && perHour) ||
      (identification === EChartList.STOPPAGE_FORECASTING && perHour)
    ) {
      setPredictionCaption('Predição por hora');
      setValueCaption('Valor por hora');
    } else if (identification === EChartList.TAKT_PER_STATION) {
      setPredictionCaption('Takt Médio');
      setValueCaption('Takt Real');
    } else {
      setPredictionCaption('Predição acumulada');
      setValueCaption('Valor acumulado');
    }
  }, [perHour]);

  useEffect(() => {
    if (data) {
      const datasetChartType = ChartDatasetsFactory(
        type,
        identification,
        data,
        perHour
      );

      setDatasetsChart(datasetChartType.data as ChartJsChartData);
      setMinYAxis(datasetChartType.minYAxis as number);
      setExpected(datasetChartType.expected as number);
      setReal(datasetChartType.real as number);
    }
  }, [data, perHour]);

  return (
    <>
      {!data && (
        <ContentLoader
          viewBox="0 0 604 402"
          animate
          backgroundColor="#EFF3F8"
          foregroundColor="#D8DDE6"
        >
          <rect width="603.33" height="402" rx="4" fill="#C4C4C4" />
        </ContentLoader>
      )}
      {data && (
        <S.Container>
          <S.HeaderContainer>
            <S.Header>
              <S.HeaderContent>
                <h1>{data[identification].label}</h1>
                {(identification === EChartList.FAILURE_FORECASTING ||
                  identification === EChartList.STOPPAGE_FORECASTING) && (
                  <S.FormGroup row aria-label="position">
                    <FormControlLabel
                      control={
                        <Checkbox onChange={() => setPerHourView(!perHour)} />
                      }
                      label="Valor por hora"
                      labelPlacement="end"
                    />
                  </S.FormGroup>
                )}
              </S.HeaderContent>
              <S.Prediction>
                <S.Expected identification={identification} view={perHour}>
                  <span>{predictionCaption}</span>
                  <span>
                    Max&nbsp;
                    {identification === EChartList.PRODUCTION_FORECASTING
                      ? expected
                      : timeFormat({
                          displayFormat: 'HH:MM:SS',
                          separatorHour: 'h ',
                          separatorMinute: "'",
                          separatorSeconds: '"',
                          time: Number(expected),
                        })}
                  </span>
                </S.Expected>
                <S.Real identification={identification} view={perHour}>
                  <span>{valueCaption}</span>
                  <span>
                    Max&nbsp;
                    {identification === EChartList.PRODUCTION_FORECASTING
                      ? real
                      : timeFormat({
                          displayFormat: 'HH:MM:SS',
                          separatorHour: 'h ',
                          separatorMinute: "'",
                          separatorSeconds: '"',
                          time: Number(real),
                        })}
                  </span>
                </S.Real>
              </S.Prediction>
            </S.Header>
            {(identification === EChartList.TAKT_PER_STATION ||
              identification === EChartList.STOPPAGE_PER_STATION ||
              identification === EChartList.FAILURE_PER_STATION) && (
              <S.ChartView>
                <span>{texts.charts.mode_view.title.pt_br}</span>
                <S.ChartViewButtons selected={viewType}>
                  <div onClick={() => setViewType(0)}>
                    <span>
                      {texts.charts.mode_view.button_labels.full_size.pt_br}
                    </span>
                  </div>
                  <div onClick={() => setViewType(1)}>
                    <span>
                      {texts.charts.mode_view.button_labels.small_size.pt_br}
                    </span>
                  </div>
                </S.ChartViewButtons>
              </S.ChartView>
            )}
          </S.HeaderContainer>
          <ChartMonitor
            page="performance"
            className={`chart--${identification.replace(/_/gm, '-')}`}
            labels={{
              yAxis:
                identification === EChartList.PRODUCTION_FORECASTING
                  ? texts.charts.labels.yAxis.quantity.pt_br
                  : texts.charts.labels.yAxis.time.pt_br,
              xAxis: xAxisLabel,
            }}
          >
            <S.ChartDraw>
              <ChartFactory
                expectedTakt={expectedTakt}
                viewType={viewType}
                options={{ minYAxis, expected, real }}
                type={type}
                data={datasetsChart}
                identification={identification}
              />
            </S.ChartDraw>
          </ChartMonitor>
        </S.Container>
      )}
    </>
  );
};
