import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuItem as MuiMenuItem,
  TextField as MuiTextField,
} from '@material-ui/core';

import { KPIPerStationProps, StationSelectedState } from '../types';

import payloadData from 'constants/payload';

import { MonthlyReportActions } from 'store/ducks/monthlyReport';

import { StateMapToPropsGlobal } from 'types';

import KPIReport from '../KPIReport';
import * as S from './styles';

const KPIPerStation = ({
  payload,
}: KPIPerStationProps<Pick<typeof payloadData, 'monthly_report'>>) => {
  const [stationSelected, setStationSelected] = useState<StationSelectedState>(
    null!
  );

  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const monthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) =>
      state.monthlyReportPage
  );

  const { setSelected } = MonthlyReportActions;
  const dispatch = useDispatch();

  useEffect(() => {
    setStationSelected({
      area_invasion:
        payload.monthly_report.kpi.per_station.area_invasion.datasets.map(
          (item) => ({
            minimum: item.minimum,
            medium: item.medium,
            maximum: item.maximum,
          })
        )[0],

      rfid_fail: payload.monthly_report.kpi.per_station.rfid_fail.datasets.map(
        (item) => ({
          minimum: item.minimum,
          medium: item.medium,
          maximum: item.maximum,
        })
      )[0],

      acc_stop_time:
        payload.monthly_report.kpi.per_station.acc_stop_time.datasets.map(
          ({ minimum, medium, maximum }) => ({ minimum, medium, maximum })
        )[0],

      avg_takt: payload.monthly_report.kpi.per_station.avg_takt.datasets.map(
        (item) => ({
          minimum: item.minimum,
          medium: item.medium,
          maximum: item.maximum,
        })
      )[0],

      fail_time: payload.monthly_report.kpi.per_station.fail_time.datasets.map(
        (item) => ({
          minimum: item.minimum,
          medium: item.medium,
          maximum: item.maximum,
        })
      )[0],

      stop_time: payload.monthly_report.kpi.per_station.stop_time.datasets.map(
        (item) => ({
          minimum: item.minimum,
          medium: item.medium,
          maximum: item.maximum,
        })
      )[0],
    });
    dispatch(setSelected(null!));
  }, [
    dispatch,
    payload.monthly_report.kpi.per_station.acc_stop_time.datasets,
    payload.monthly_report.kpi.per_station.area_invasion.datasets,
    payload.monthly_report.kpi.per_station.avg_takt.datasets,
    payload.monthly_report.kpi.per_station.fail_time.datasets,
    payload.monthly_report.kpi.per_station.rfid_fail.datasets,
    payload.monthly_report.kpi.per_station.stop_time.datasets,
    setSelected,
    settings.building,
  ]);

  useEffect(() => {
    if (monthlyReportPage.station_selected) {
      setStationSelected({
        area_invasion:
          payload.monthly_report.kpi.per_station.area_invasion.datasets
            .filter((value) => value.id === monthlyReportPage.station_selected)
            .map(({ minimum, medium, maximum }) => ({
              minimum,
              medium,
              maximum,
            }))[0],

        rfid_fail: payload.monthly_report.kpi.per_station.rfid_fail.datasets
          .filter((value) => value.id === monthlyReportPage.station_selected)
          .map(({ minimum, medium, maximum }) => ({
            minimum,
            medium,
            maximum,
          }))[0],

        acc_stop_time:
          payload.monthly_report.kpi.per_station.acc_stop_time.datasets
            .filter((value) => value.id === monthlyReportPage.station_selected)
            .map(({ minimum, medium, maximum }) => ({
              minimum,
              medium,
              maximum,
            }))[0],

        avg_takt: payload.monthly_report.kpi.per_station.avg_takt.datasets
          .filter((value) => value.id === monthlyReportPage.station_selected)
          .map(({ minimum, medium, maximum }) => ({
            minimum,
            medium,
            maximum,
          }))[0],

        fail_time: payload.monthly_report.kpi.per_station.fail_time.datasets
          .filter((value) => value.id === monthlyReportPage.station_selected)
          .map(({ minimum, medium, maximum }) => ({
            minimum,
            medium,
            maximum,
          }))[0],

        stop_time: payload.monthly_report.kpi.per_station.stop_time.datasets
          .filter((value) => value.id === monthlyReportPage.station_selected)
          .map(({ minimum, medium, maximum }) => ({
            minimum,
            medium,
            maximum,
          }))[0],
      });
    }
  }, [
    monthlyReportPage.station_selected,
    payload.monthly_report.kpi.per_station.acc_stop_time.datasets,
    payload.monthly_report.kpi.per_station.area_invasion.datasets,
    payload.monthly_report.kpi.per_station.avg_takt.datasets,
    payload.monthly_report.kpi.per_station.fail_time.datasets,
    payload.monthly_report.kpi.per_station.rfid_fail.datasets,
    payload.monthly_report.kpi.per_station.stop_time.datasets,
  ]);

  return (
    <>
      <S.KPISelectStation>
        <MuiTextField
          select
          className="nav__Mui-select-station"
          defaultValue={
            monthlyReportPage.station_selected
              ? monthlyReportPage.station_selected.toString()
              : payload.monthly_report.kpi.per_station.station_list.datasets[0].id.toString()
          }
          value={
            monthlyReportPage.station_selected
              ? monthlyReportPage.station_selected.toString()
              : payload.monthly_report.kpi.per_station.station_list.datasets[0].id.toString()
          }
          onChange={(e) => {
            dispatch(setSelected(Number(e.target.value)));
          }}
          InputProps={{
            classes: {
              root: 'nav__Mui-input-station--root',
            },
          }}
          SelectProps={{
            classes: {
              root: 'nav__Mui-select-station--root',
              select: 'nav__Mui-select-station--select',
              icon: 'nav__Mui-select-station--icon',
            },
            MenuProps: {
              classes: {
                list: 'nav__Mui-select-station__list',
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            },
          }}
        >
          {payload &&
            payload.monthly_report.kpi.per_station.station_list.datasets
              .sort((failA, failB) => {
                if (Number(failA.order) > Number(failB.order)) return 1;
                if (Number(failA.order) < Number(failB.order)) return -1;
                return 0;
              })
              .map((station) => (
                <MuiMenuItem
                  key={station.id}
                  data-key={station.order}
                  value={station.id}
                >
                  {station.label}
                </MuiMenuItem>
              ))}
        </MuiTextField>
      </S.KPISelectStation>
      {stationSelected && payload && (
        <S.KPIPerStationContainer>
          <div>
            <KPIReport
              labels={
                payload.monthly_report.kpi.per_station.area_invasion.labels
              }
              values={stationSelected.area_invasion}
              marginBottom={3}
              prefix="min"
            />
            <KPIReport
              labels={
                payload.monthly_report.kpi.per_station.acc_stop_time.labels
              }
              values={stationSelected.acc_stop_time}
              marginBottom={3}
              prefix="min"
            />
            <KPIReport
              labels={payload.monthly_report.kpi.per_station.rfid_fail.labels}
              values={stationSelected.rfid_fail}
              marginBottom={3}
              prefix="min"
            />
            <KPIReport
              labels={payload.monthly_report.kpi.per_station.avg_takt.labels}
              values={stationSelected.avg_takt}
              marginBottom={3}
              prefix="min"
            />
          </div>
          <div>
            <KPIReport
              labels={payload.monthly_report.kpi.per_station.fail_time.labels}
              values={stationSelected.fail_time}
              marginBottom={3}
              prefix="min"
            />
            <KPIReport
              labels={payload.monthly_report.kpi.per_station.stop_time.labels}
              values={stationSelected.stop_time}
              marginBottom={3}
              prefix="min"
            />
          </div>
        </S.KPIPerStationContainer>
      )}
    </>
  );
};

export default KPIPerStation;
