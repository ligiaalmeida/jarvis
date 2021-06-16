import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pathname, RouterProps } from 'types';
import { displayDate } from 'utils/js';
import payload from 'constants/payload';

import { MonthlyReportActions } from 'store/ducks/monthlyReport';
import { theme } from 'styles/theme';
import api from 'services/api';

import KPIReport from './KPIReport';
import GeneralChart from './Charts/GeneralChart';
import LineChart from './Charts/LineChart';

import Error from 'components/Icons/Error';
import MessageError from 'components/Messages/Error';
import InputList from 'components/Pages/InputList';
import Footer from 'components/Footer';

import { StateMapToPropsGlobal } from 'types';

import KPIPerStation from './KPIPerStation';
import Loading from './KPIReport/Loading';
import texts from './texts';
import * as S from './styles';

const MonthlyReportPage = () => {
  const [data, setData] = useState<typeof payload>(null!);
  const [date, setDate] = useState('');
  const [isError, setIsError] = useState(false);
  const [newRequest, setNewRequest] = useState(false);

  const router = useSelector((state: RouterProps) => state.router);
  const settings = useSelector((state: Pick<StateMapToPropsGlobal, 'global'>) => state.global);
  const monthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) => state.monthlyReportPage
  );

  const { isLoading } = MonthlyReportActions;
  const dispatch = useDispatch();

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    dispatch(isLoading(true));
    setDate(displayDate({ date: monthlyReportPage.params.date, format: 'MMMM/yyyy' }));

    if (monthlyReportPage.params) {
      const body = {
        date: monthlyReportPage.params.date,
        type: 'daily_history',
      };

      api()
        .post(`/${settings.building}_monthly_report`, body)
        .then((res) => {
          setData(JSON.parse(JSON.stringify(res.data)));

          loadingTimeout = setTimeout(() => {
            dispatch(isLoading(false));
          }, 800);

          if (process.env.NODE_ENV === 'development') {
            console.log('res ->', res.data);
          }
        })
        .catch((_) => {
          setIsError(true);
        });
    }

    return () => {
      clearTimeout(loadingTimeout);
      dispatch(isLoading(false));
    };
  }, [settings.building, monthlyReportPage.params.date, newRequest]);

  return (
    <>
      <S.Main>
        <InputList
          padding={`${theme.distance.normal}rem 0`}
          pathname={router.location.pathname as Pathname}
          customCSSInputList={S.customCSSInputList}
          customCSSHeader={S.customCSSHeader}
          invertedElement
        >
          <S.Title>
            <h1>{texts.title.pt_br}</h1>
            <p>
              {texts.reference_month.pt_br}: {date}
            </p>
          </S.Title>
        </InputList>

        {isError && (
          <MessageError
            isVisible
            title={texts.messages.errors.data.pt_br}
            description={
              <button
                onClick={() => {
                  setNewRequest(true);
                  setIsError(false);
                }}
              >
                Recarregar página
              </button>
            }
            icon={<Error />}
          />
        )}

        {!isError && (
          <>
            <S.General>
              <div>
                {monthlyReportPage.loading && <Loading />}
                <KPIReport
                  labels={data?.monthly_report?.kpi?.general?.expected_takt?.labels}
                  values={data?.monthly_report?.kpi?.general?.expected_takt?.values}
                  marginBottom={3}
                  prefix="min"
                />

                <KPIReport
                  labels={data?.monthly_report?.kpi?.general?.production_goal?.labels}
                  values={data?.monthly_report?.kpi?.general?.production_goal?.values}
                  prefix={texts.kpi.prefix.truck.pt_br}
                />
              </div>
              <div>
                <GeneralChart
                  data={data?.monthly_report?.charts?.current_takt}
                  title={texts.charts.current_takt.title.pt_br}
                  labels={data?.monthly_report?.charts?.current_takt?.labels}
                />
              </div>
            </S.General>
          </>
        )}

        {data && !isError && (
          <>
            <S.ChartAllShift>
              <h3>{texts.charts.title.pt_br}</h3>

              <div>
                <LineChart
                  type="daily_production"
                  date={date}
                  data={data?.monthly_report?.charts?.daily_production}
                  title={data?.monthly_report?.charts?.daily_production?.labels?.chart_title}
                  labels={data?.monthly_report?.charts?.daily_production?.labels}
                />
              </div>
              <div>
                <LineChart
                  type="daily_deviation"
                  date={date}
                  data={data?.monthly_report?.charts?.daily_deviation}
                  title={data?.monthly_report?.charts?.daily_deviation?.labels?.chart_title}
                  labels={data?.monthly_report?.charts?.daily_deviation?.labels}
                />
              </div>
              <div>
                <LineChart
                  type="line_stoppage_time"
                  date={date}
                  data={data?.monthly_report?.charts?.line_stoppage_time}
                  title={data?.monthly_report?.charts?.line_stoppage_time?.labels?.chart_title}
                  labels={data?.monthly_report?.charts?.line_stoppage_time?.labels}
                />
              </div>
            </S.ChartAllShift>
            <S.KPIWrapper>
              <h3>{data?.monthly_report.kpi?.per_station?.station_list?.label}</h3>
              <KPIPerStation payload={data} />
            </S.KPIWrapper>
          </>
        )}
      </S.Main>
      <Footer />
    </>
  );
};

export default MonthlyReportPage;
