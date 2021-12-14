import {
  ActiveFailList,
  ColorStatusType,
  DirectionOfStations,
  LegendsLabels,
  StationsListRowsUtil,
  Stations,
  StationsList,
  StationItemUtil,
  ConnectionsList,
  StationListGroupLineHUtil,
} from 'types';
import { StationItemPosition } from './types';

import { theme } from 'styles/theme';

export const activeFailList = (station: Stations) => {
  let isError = true;
  let status: ColorStatusType = 'default';
  let color = theme.colors.fails.default;
  let failure = '';

  if (station && station.active_fail_list) {
    isError = false;

    const GravityLevel = station.active_fail_list.length
      ? station.active_fail_list
          .map((fail) => fail.gravity)
          .reduce((a, b) => Math.max((a as number) || 0, (b as number) || 0))
      : 'default';

    const maxFailGravityItem =
      GravityLevel !== 'default'
        ? station.active_fail_list.filter(
            (fail) => fail.gravity === GravityLevel
          )[0]
        : {};

    failure = station.active_fail_list.length
      ? station.active_fail_list.filter(
          (fail) => fail.gravity === GravityLevel
        )[0].label
      : station.label;

    if (
      !station.active_fail_list.length &&
      !station.baumuster &&
      !station.num_prod
    ) {
      status = 'empty';
      color = theme.colors.fails.empty;
    }

    if (station.active_fail_list.length) {
      status = 'error';
      color = (maxFailGravityItem as StationItemPosition).color;
    }
  }

  return { color, status, failure, isError };
};

export const maxFailsList = <T>(data: T[], compare: keyof T) => {
  return data.length
    ? data.reduce((prev, current) =>
        prev[compare] > current[compare] ? prev : current
      )
    : [];
};

export const stationsWithTheBiggestFailure = (data: StationsList[]) => {
  return data &&
    data.filter((failList) => failList.active_fail_list.length).length
    ? data
        .filter((failList) => failList.active_fail_list.length)
        .map((station) => ({
          ...station,
          baumuster: station.baumuster.trim(),
          active_fail_list: maxFailsList<ActiveFailList>(
            station.active_fail_list,
            'gravity'
          ) as ActiveFailList,
        }))
        .reduce((prev, next) =>
          prev.active_fail_list?.gravity > next.active_fail_list?.gravity
            ? prev
            : next
        )
    : data[0];
};

export const comparePositionID = (id: string) => `${id.split('.')[0]}.`;

export const listStationConnections = (
  connectionsList: ConnectionsList[],
  includes: string
) =>
  connectionsList.filter((station) =>
    station.station_connections.includes(includes)
  );

export const listParallelStations = (stationList: StationsList[]) =>
  stationList
    .filter((station) => station.position_id.includes('.'))
    .map((station) => station.label);

export const stationItem = ({
  stationList,
  legends,
  directionType,
  compareWith,
  filterStation,
  connections,
}: StationItemUtil) => {
  return stationList.filter(filterStation).map((station) => {
    const { color } = activeFailList(station);
    let direction: DirectionOfStations;

    switch (directionType) {
      case 1:
        direction =
          comparePositionID(station.position_id) === compareWith
            ? 'horizontal'
            : 'vertical';
        break;
      case 2:
        direction = 'horizontal';
        break;
      default:
        direction = 'vertical';
    }

    return {
      ...station,
      color,
      label: station.label.trim(),
      directionOfStations: direction,
      connections: listStationConnections(connections, station.label),
      isParallel: listParallelStations(stationList).includes(station.label),
      legends:
        legends.filter((legends) =>
          legends.stations_legend.includes(station.label)
        )[0] || [],
    };
  });
};

export const stationListGroupLineH = ({
  stationList,
  legends,
  connections,
}: StationListGroupLineHUtil) => {
  return (
    stationList &&
    stationList.reduce((acc, next) => {
      if ((next.position_id as string).includes('.')) {
        if (next.position_id.includes('.0')) {
          acc.push(
            stationItem({
              stationList,
              legends: legends as LegendsLabels[],
              directionType: 1,
              compareWith: '5.',
              connections,
              filterStation: (station) =>
                comparePositionID(station.position_id) ===
                comparePositionID(next.position_id),
            })
          );
        }
      } else {
        if (Number(next.position_id) >= 0 && Number(next.position_id) <= 0.3) {
          // módulo esteira de longarina
          if (next.position_id === '0') {
            acc.push(
              stationItem({
                stationList,
                legends: legends as LegendsLabels[],
                directionType: 2,
                connections,
                filterStation: (station) =>
                  Number(station.position_id) >= 0 &&
                  Number(station.position_id) <= 0.3,
              })
            );
          }
        }
        if (Number(next.position_id) >= 21 && Number(next.position_id) <= 27) {
          // do 21 ao 26
          if (next.position_id === '21') {
            // EOM MOTORES
            acc.push(
              stationItem({
                stationList,
                legends: legends as LegendsLabels[],
                directionType: 2,
                connections,
                filterStation: (station) =>
                  Number(station.position_id) >= 21 &&
                  Number(station.position_id) <= 23,
              })
            );
          }
          if (next.position_id === '25') {
            // EOM CABINE
            acc.push(
              stationItem({
                stationList,
                legends: legends as LegendsLabels[],
                directionType: 2,
                connections,
                filterStation: (station) =>
                  Number(station.position_id) >= 25 &&
                  Number(station.position_id) <= 27,
              })
            );
          }
        } else {
          if (
            Number(next.position_id) >= 4 &&
            Number(next.position_id) <= 4.5
          ) {
            if (next.position_id >= '4') {
              if (next.position_id === '4') {
                acc.push(
                  stationItem({
                    stationList,
                    legends: legends as LegendsLabels[],
                    directionType: 2,
                    connections,
                    filterStation: (station) =>
                      Number(station.position_id) === 4,
                  })
                );
              }
              acc.push(
                // PEDAGIO 6
                stationItem({
                  stationList,
                  legends: legends as LegendsLabels[],
                  directionType: 2,
                  connections,
                  filterStation: (station) =>
                    Number(station.position_id) >= 4.1 &&
                    Number(station.position_id) <= 4.5,
                })
              );
              // if (
              //   Number(next.position_id) >= 5.0 &&
              //   Number(next.position_id) <= 5.4
              // ) {
              //   acc.push(
              //     // PEDAGIO 7
              //     stationItem({
              //       stationList,
              //       legends: legends as LegendsLabels[],
              //       directionType: 1,
              //       connections,
              //       filterStation: (station) =>
              //         Number(station.position_id) >= 5.0 &&
              //         Number(station.position_id) <= 4.5,
              //     })
              //   );
              // }
            }
          } else if (
            Number(next.position_id) >= 7 &&
            Number(next.position_id) <= 10
          ) {
            if (next.position_id === '7') {
              acc.push(
                stationItem({
                  stationList,
                  legends: legends as LegendsLabels[],
                  directionType: 2,
                  connections,
                  filterStation: (station) =>
                    Number(station.position_id) >= 7 &&
                    Number(station.position_id) <= 10,
                })
              );
            }
          } else {
            if (Number(next.position_id) !== 0) {
              acc.push([
                {
                  ...next,
                  label: next.label.trim(),
                  color: activeFailList(next).color,
                  directionOfStations: 'horizontal',
                  isParallel: false,
                  connections,
                  legends:
                    (legends as LegendsLabels[])?.filter((legends) =>
                      legends.stations_legend.includes(next.label)
                    )[0] || [],
                },
              ]);
            }
          }
        }
      }
      // console.log('acc', acc);
      return acc;
    }, [] as StationsListRowsUtil)
  );
};

export const stationsListRowsLineH = (
  stationList: StationsListRowsUtil,
  quantityStations: number
) => {
  let count = 0;

  return (
    stationList &&
    stationList.reduce((acc, next) => {
      if (next[0].directionOfStations) {
        if (count === 0) acc.push([]);

        count += next[0].directionOfStations === 'vertical' ? 1 : next.length;

        acc[acc.length - 1].push(next);

        if (count < quantityStations) return acc;

        count = 0;
      }
      return acc;
    }, [] as StationsList[][][])
  );
};
