import { useState, useEffect } from 'react';
import HTMLParser from 'html-react-parser';
import { useSelector } from 'react-redux';

import { getLineToDisplay } from 'utils/js/getLineToDisplay';
import { Pathname, RouterProps } from 'types';
import { EChartList } from 'enums/chartList';
import { PerformanceHistoryActions } from 'store/ducks/performanceHistory';
import { theme } from 'styles/theme';
import payload from 'constants/payload';
import api from 'services/api';

import InputList from 'components/Pages/InputList';
import { Row } from 'components/Layout/Row';
import NavTabs from 'components/NavTabs';
import Message from 'components/Messages/Error';
import Error from 'components/Icons/Error';
import Kpi from 'components/Kpi';
import Footer from 'components/Footer';

import { Chart } from 'pages/PerformancePage/Chart';

import { StateMapToPropsGlobal, ChartType, ChartData } from 'types';

import texts from './texts';
import * as S from './styles';

const chartItemsHistory = {
  row: [
    {
      id: 0,
      identification: EChartList.PRODUCTION_FORECASTING,
      type: 'line',
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
    title: 'Takt realizado por estação - Saúde da Estação',
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

const PerformanceHistoryPage = () => {
  const [expectedTakt, setExpectedTakt] = useState(15);
  const [data, setData] = useState<Pick<typeof payload, 'performance_history'>>(
    null!
  );
  const [disclaimerOptions, setDisclaimerOptions] = useState({
    date: '',
    hour: 0,
    line: '',
  });

  const router = useSelector((state: RouterProps) => state.router);
  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const getInputPerformanceHistoryPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'performanceHistoryPage'>) =>
      state.performanceHistoryPage
  );

  const { toggleAutomaticMode, timer } = PerformanceHistoryActions;

  useEffect(() => {
    if (getInputPerformanceHistoryPage.params) {
      const body = {
        date: getInputPerformanceHistoryPage.params.date,
        hour: getInputPerformanceHistoryPage.params.hour,
        type: 'hour_performance_history',
      };

      api()
        .post(`/socket/${settings.building}_performance_history`, body)
        .then((res) => setData(JSON.parse(JSON.stringify(res.data))));

      const date = new Date(
        Number(body.date.split('-')[0]),
        Number(body.date.split('-')[1]) - 1,
        Number(body.date.split('-')[2])
      );

      const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date);

      setDisclaimerOptions({
        date: dateFormatted,
        hour: body.hour,
        line: getLineToDisplay(settings.building),
      });
    }
  }, [settings.building, getInputPerformanceHistoryPage.params]);

  useEffect(() => {
    if (data?.performance_history) {
      setExpectedTakt(
        Math.ceil(
          +data.performance_history.kpi_list
            .filter((kpi) => kpi.title === 'Takt Esperado')[0]
            .value.toString()
            .replace(/([0-9]+)'([0-9]+)"/, '$1.$2')
        )
      );
    }
  }, [data]);

  return (
    <>
      <S.Main>
        <InputList
          pathname={router.location.pathname as Pathname}
          padding={`${theme.distance.normal}rem`}
          customCSSInputList={S.customCSSInputList}
          invertedElement
        >
          {disclaimerOptions.date && (
            <S.Disclaimer>
              {HTMLParser(
                texts.messages.error.pt_br
                  .replace('${name}', texts.name.pt_br)
                  .replace('${line}', disclaimerOptions.line)
                  .replace('${date}', disclaimerOptions.date)
                  .replace('${hour}', `${disclaimerOptions.hour}h`)
              )}
            </S.Disclaimer>
          )}
        </InputList>
        {
          <Message
            isVisible={data && !data.performance_history}
            title="Desculpe, não foi possível carregar a página"
            description="Por favor, escolha outra data ou hora ou linha e tente novamente"
            icon={<Error />}
          />
        }
        {data && data?.performance_history && (
          <S.Content>
            <Kpi data={data?.performance_history?.kpi_list} />
            <Row padding={[0, 2.5, 0, 'rem']}>
              {chartItemsHistory.row.map((chart) => (
                <S.ContentChart key={chart.id}>
                  <Chart
                    type={chart.type as ChartType}
                    data={data?.performance_history.chart_list as ChartData}
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
              namespace="performanceHistoryPage"
              data={chartItemsHistory.charts.map((chart, idx) => ({
                label: tabs[idx],
                componentChildren: [
                  <S.ContentChart key={chart.id}>
                    <Chart
                      type={chart.type as ChartType}
                      expectedTakt={expectedTakt}
                      data={data?.performance_history.chart_list as ChartData}
                      identification={chart.identification}
                    />
                  </S.ContentChart>,
                ],
              }))}
            />
          </S.Content>
        )}
      </S.Main>
      <Footer />
    </>
  );
};

export default PerformanceHistoryPage;
