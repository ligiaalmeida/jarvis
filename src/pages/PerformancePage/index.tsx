import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PerformanceActions } from 'store/ducks/performance';
import { useSocket } from 'hooks';
import { theme } from 'styles/theme';
import payload from 'constants/payload';

import { Row } from 'components/Layout/Row';
import NavTabs from 'components/NavTabs';
import Kpi from 'components/Kpi';
import InputList from 'components/Pages/InputList';

import { EChartList } from 'enums/chartList';
import namespace from 'constants/namespace';
import env from 'constants/env';

import {
  StateMapToPropsGlobal,
  ChartType,
  ChartData,
  RouterProps,
  Pathname,
} from 'types';

import { Chart } from './Chart';
import * as S from './styles';
import Footer from '../../components/Footer';

const chartItems = {
  default: [
    {
      id: 0,
      type: 'line',
      identification: EChartList.PRODUCTION_FORECASTING,
    },
    {
      id: 1,
      type: 'line',
      identification: EChartList.FAILURE_FORECASTING,
    },
    {
      id: 2,
      type: 'line',
      identification: EChartList.STOPPAGE_FORECASTING,
    },
  ],
  charts: [
    {
      id: 0,
      type: 'bar',
      identification: EChartList.TAKT_PER_STATION,
    },
    {
      id: 1,
      type: 'bar',
      identification: EChartList.STOPPAGE_PER_STATION,
    },
    {
      id: 2,
      type: 'bar',
      identification: EChartList.FAILURE_PER_STATION,
    },
  ],
};
const tabs = [
  {
    id: 0,
    title: 'Takt atual por estação - Saúde da Estação',
  },
  {
    id: 1,
    title: 'Parada por estação - Saúde da Estação',
  },
  {
    id: 2,
    title: 'Falha por estação - Saúde da Estação',
  },
];

const PerformancePage = () => {
  const [expectedTakt, setExpectedTakt] = useState(15);

  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const router = useSelector((state: RouterProps) => state.router);
  const { toggleAutomaticMode, timer } = PerformanceActions;

  const URI_BASE =
    process.env.NODE_ENV === 'development'
      ? env.development.APP_WS_URL_BASE
      : env.host.APP_WS_URL;

  const { data } = useSocket<Pick<typeof payload, 'performance'>>({
    uri: URI_BASE,
    namespace: `/${settings.building}_${namespace.PERFORMANCE}`,
  });

  // const data = payload;

  useEffect(() => {
    if (data) {
      setExpectedTakt(
        Math.ceil(
          +data.performance.kpi_list
            .filter((kpi) => kpi.title === 'Takt Esperado')[0]
            .value.toString()
            .replace(/([0-9]+)'([0-9]+)"/, '$1.$2')
        )
      );
    }
  }, [data]);

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(' Performance ->');
    console.log(data);
    console.groupEnd();
  }

  return (
    <>
      <S.Main>
        <S.Content>
          <InputList
            customCSSInputList={S.customCSSInputList}
            pathname={router.location.pathname as Pathname}
            padding={`${theme.distance.normal}rem`}
          />
          <Kpi data={data?.performance.kpi_list} />
          <Row
            padding={[
              0,
              theme.distance.normal,
              theme.distance.small + 1,
              'rem',
            ]}
          >
            {chartItems.default.map((chart) => (
              <S.ContentChart key={chart.id}>
                <Chart
                  type={chart.type as ChartType}
                  data={data?.performance.chart_list as ChartData}
                  identification={chart.identification}
                />
              </S.ContentChart>
            ))}
          </Row>
          <NavTabs
            isSettings
            isHeightFull
            loader={!!data}
            actionTimer={timer}
            actionAutomaticMode={toggleAutomaticMode}
            namespace="performancePage"
            data={chartItems.charts.map((chart, idx) => ({
              label: tabs[idx],
              componentChildren: [
                <S.ContentChart key={chart.id}>
                  <Chart
                    type={chart.type as ChartType}
                    expectedTakt={expectedTakt}
                    data={data?.performance.chart_list as ChartData}
                    identification={chart.identification}
                  />
                </S.ContentChart>,
              ],
            }))}
          />
        </S.Content>
      </S.Main>
      <Footer />
    </>
  );
};

export default PerformancePage;
