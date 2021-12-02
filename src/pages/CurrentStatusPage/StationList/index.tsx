import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';

import {
  ActiveFailList,
  ConnectionsList,
  LegendsLabels,
  StateMapToPropsGlobal,
  StationActive,
  StationsList,
  StationsListRowsUtil,
} from 'types';

import { useSetInterval, useWindowWidth } from 'hooks';
import { timeFormat } from 'utils/js';

import { CurrentStatusActions } from 'store/ducks/currentStatus';

import * as util from '../util';
import * as Types from '../types';
import * as S from './styles';
import Legends from '../Legends';
import { theme } from 'styles/theme';

const StationList = ({ stationList }: Types.StationListProps) => {
  const [media1340, setMedia1340] = useState(false);
  const [time, setTime] = useState('');

  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const currentStatusPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'currentStatusPage'>) =>
      state.currentStatusPage
  );

  const stationGroup = util.stationListGroupLineH({
    stationList: stationList?.station_list as StationsList[],
    legends: stationList?.legends_labels as LegendsLabels[],
    connections: stationList?.connections_list as ConnectionsList[],
  });
  const stations = util.stationsListRowsLineH(
    stationGroup,
    media1340 ? 9 : 12
  ) as StationsListRowsUtil[];

  const { stationActive } = CurrentStatusActions;
  const dispatch = useDispatch();

  const width = useWindowWidth();
  const classes = S.useStyles();

  useEffect(() => {
    dispatch(
      stationActive({
        position_id: '',
        num_prod: 0,
        baumuster: '',
        label: '',
        color: '',
        active_fail_list: [],
      })
    );
  }, [settingsGlobal.building]);

  useEffect(() => {
    if (stationList) {
      const stationListConcat = stationGroup.reduce((prev, next) => {
        return prev.concat(next);
      });

      const stationMaxFail =
        util.stationsWithTheBiggestFailure(stationListConcat);

      if (currentStatusPage.station.label.length === 0) {
        dispatch(
          stationActive({
            position_id: stationMaxFail.position_id,
            num_prod: stationMaxFail.num_prod,
            baumuster: stationMaxFail.baumuster,
            label: stationMaxFail.label,
            color: stationMaxFail.color as string,
            active_fail_list: stationMaxFail.active_fail_list as ActiveFailList,
          })
        );
      } else {
        const payloadFiltered = stationListConcat.filter(
          (station) =>
            station.position_id === currentStatusPage.station.position_id
        )[0];

        if (
          currentStatusPage.station.label.length > 0 ||
          currentStatusPage.station.num_prod !== payloadFiltered?.num_prod ||
          (stationMaxFail.active_fail_list as ActiveFailList)?.label
        ) {
          if (stationMaxFail.position_id === '0') {
            const station = stationListConcat
              .filter(
                (station) =>
                  station.position_id === currentStatusPage.station.position_id
              )
              .map((station) => ({
                position_id: station.position_id,
                num_prod: station.num_prod,
                baumuster: station.baumuster,
                label: station.label,
                color: station.color as string,
                active_fail_list: station.active_fail_list,
              }))[0] as StationActive;

            dispatch(stationActive(station));
          } else {
            dispatch(
              stationActive({
                position_id: stationMaxFail.position_id,
                num_prod: stationMaxFail.num_prod,
                baumuster: stationMaxFail.baumuster,
                label: stationMaxFail.label,
                color: stationMaxFail.color as string,
                active_fail_list:
                  stationMaxFail.active_fail_list as ActiveFailList,
              })
            );
          }
        }
      }
    }
  }, [stationList]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1340px)');

    setMedia1340(mediaQuery.matches);
  }, [width]);

  useSetInterval({
    condition: !!currentStatusPage.station?.active_fail_list,
    delay: 1000,
    callback: () => {
      if (stationList) {
        const dateNow = Date.parse(`${new Date()}`);
        let durationTimestamp = 0;
        let durationSeconds = 0;

        if (
          (currentStatusPage.station.active_fail_list as ActiveFailList)
            ?.timestamp
        ) {
          const timestamp = (
            currentStatusPage.station.active_fail_list as ActiveFailList
          ).timestamp;
          durationTimestamp = dateNow - timestamp;
          durationSeconds = Math.ceil(durationTimestamp / 1000);

          setTime(
            timeFormat({
              time: durationSeconds,
              displayFormat: 'HH:MM:SS',
              separatorHour: 'h ',
              separatorMinute: "' ",
              separatorSeconds: '"',
            })
          );
        } else {
          setTime('');
        }
      }
    },
  });

  return (
    <S.StationList>
      <S.StationsContainer className="station-list">
        {stations &&
          stations.reverse().map((row, idxRow) => (
            <S.Row key={idxRow} line={settingsGlobal.building}>
              {idxRow % 2 === 1
                ? row.reverse().map((group, idxGroup) => (
                    <React.Fragment key={idxGroup}>
                      {group[0] && (
                        <S.Group
                          key={idxGroup}
                          directionItems={group[0].directionOfStations}
                        >
                          {group.reverse().map((station, idxStation) => (
                            <React.Fragment key={idxStation}>
                              <S.Station
                                id={station.position_id}
                                key={idxStation}
                                directionItems={group[0].directionOfStations}
                                isActive={
                                  currentStatusPage.station.label ===
                                  station.label
                                }
                                onClick={() => {
                                  dispatch(
                                    stationActive({
                                      position_id: station.position_id,
                                      label: station.label,
                                      num_prod: station.num_prod,
                                      baumuster: station.baumuster,
                                      color: station.color as string,
                                      active_fail_list:
                                        util.maxFailsList<ActiveFailList>(
                                          station.active_fail_list,
                                          'gravity'
                                        ) as ActiveFailList,
                                    })
                                  );
                                }}
                              >
                                <S.StationContent
                                  backgroundColor={station.color as string}
                                >
                                  <span>{station.label.split(' ')[1]}</span>
                                </S.StationContent>
                              </S.Station>

                              {!!group[0].legends.label &&
                                group.length - 1 === idxStation && (
                                  <S.Legend
                                    numberStations={row[idxGroup].length}
                                    directionItems={station.directionOfStations}
                                  >
                                    <div>
                                      <span className="station-list__legend">
                                        {group[0].legends.label}
                                      </span>
                                      {!station.connections.length ? (
                                        ''
                                      ) : (
                                        <Tooltip
                                          classes={{
                                            tooltip: classes.customTooltip,
                                          }}
                                          title={`Conexão com a ${station.connections[0].label}`}
                                          aria-label="conexão"
                                        >
                                          <div className="station-list__integration" />
                                        </Tooltip>
                                      )}
                                    </div>
                                  </S.Legend>
                                )}
                            </React.Fragment>
                          ))}
                        </S.Group>
                      )}
                    </React.Fragment>
                  ))
                : row.map((group, idxGroup) => (
                    <React.Fragment key={idxGroup}>
                      {group[0] && (
                        <S.Group
                          key={idxGroup}
                          directionItems={group[0].directionOfStations}
                        >
                          {group.map((station, idxStation) => (
                            <React.Fragment key={idxStation}>
                              <S.Station
                                id={station.position_id}
                                key={idxStation}
                                directionItems={group[0].directionOfStations}
                                isActive={
                                  currentStatusPage.station.label ===
                                  station.label
                                }
                                onClick={() => {
                                  dispatch(
                                    stationActive({
                                      position_id: station.position_id,
                                      label: station.label,
                                      num_prod: station.num_prod,
                                      baumuster: station.baumuster,
                                      color: station.color as string,
                                      active_fail_list:
                                        util.maxFailsList<ActiveFailList>(
                                          station.active_fail_list,
                                          'gravity'
                                        ) as ActiveFailList,
                                    })
                                  );
                                }}
                              >
                                {station.position_id === '0' && (
                                  <S.Distinction
                                    color={theme.colors.primary_6}
                                  />
                                )}
                                {station.position_id === '0.3' && (
                                  <S.Distinction
                                    color={theme.colors.secondary_1}
                                  />
                                )}

                                <S.StationContent
                                  backgroundColor={station.color as string}
                                >
                                  <span>
                                    {(station.position_id === '0' &&
                                      station.label.split(' ')[2]) ||
                                      (station.position_id === '0.3' &&
                                        station.label
                                          .split(' ')[2]
                                          .substring(0, 4)) ||
                                      station.label.split(' ')[1]}
                                  </span>
                                </S.StationContent>
                              </S.Station>

                              {!!group[0].legends.label &&
                                group.length - 1 === idxStation && (
                                  <S.Legend
                                    numberStations={row[idxGroup].length}
                                    directionItems={station.directionOfStations}
                                  >
                                    <div>
                                      <span className="station-list__legend">
                                        {group[0].legends.label}
                                      </span>
                                      {!station.connections.length ? (
                                        ''
                                      ) : (
                                        <Tooltip
                                          classes={{
                                            tooltip: classes.customTooltip,
                                          }}
                                          title={`Conexão com a ${station.connections[0].label}`}
                                          aria-label="conexão"
                                        >
                                          <div className="station-list__integration" />
                                        </Tooltip>
                                      )}
                                    </div>
                                  </S.Legend>
                                )}
                            </React.Fragment>
                          ))}
                        </S.Group>
                      )}
                    </React.Fragment>
                  ))}
              {(idxRow === 2 || idxRow === row.length - 1) &&
                settingsGlobal.building === 'line_h' && (
                  <div className="station-list__name">
                    <span>
                      {idxRow === row[row.length - 1].length
                        ? 'SGPRO2'
                        : 'SGPRO1'}
                    </span>
                  </div>
                )}
            </S.Row>
          ))}
      </S.StationsContainer>
      <S.InformationContainer>
        {currentStatusPage.station.label && (
          <S.InformationWrapper>
            <S.Card backgroundColor={currentStatusPage.station.color}>
              <header>
                <h2>
                  {(
                    currentStatusPage.station.active_fail_list as ActiveFailList
                  )?.label || 'Sem falhas até o momento'}
                </h2>
              </header>

              <section className="station-list__information">
                <S.InformationItem
                  positionId={currentStatusPage.station.position_id}
                >
                  <span className="station-list__information__title">
                    Estação
                  </span>
                  <span className="station-list__information__description station-list__information__description--number">
                    {(currentStatusPage.station.position_id === '0' &&
                      currentStatusPage.station.label.split(' ')[2]) ||
                      (currentStatusPage.station.position_id === '0.3' &&
                        currentStatusPage.station.label
                          .split(' ')[2]
                          .substring(0, 4)) ||
                      currentStatusPage.station.label.split(' ')[1]}
                  </span>
                </S.InformationItem>

                <S.InformationItem>
                  <span className="station-list__information__title">
                    Num. prod
                  </span>
                  <span className="station-list__information__description">
                    {currentStatusPage.station.num_prod || '---'}
                  </span>
                </S.InformationItem>

                <S.InformationItem>
                  <span className="station-list__information__title">
                    Baumuster
                  </span>
                  <span className="station-list__information__description">
                    {currentStatusPage.station.baumuster || '---'}
                  </span>
                </S.InformationItem>

                <S.InformationItem>
                  <span className="station-list__information__title">Time</span>
                  <span className="station-list__information__description">
                    {time || '---'}
                  </span>
                </S.InformationItem>
              </section>
            </S.Card>
            <footer>
              <Legends />
            </footer>
          </S.InformationWrapper>
        )}
      </S.InformationContainer>
    </S.StationList>
  );
};

export default StationList;
