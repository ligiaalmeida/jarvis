export type CurrentFaults<T> = T;

export type ActiveFailList = {
  nome_sinal: string;
  timestamp: number;
  gravity: number;
  label: string;
  color: string;
};

export type Stations = {
  label: string;
  num_prod: number;
  baumuster: string;
  active_fail_list: ActiveFailList[];
};

export type StationsList = {
  position_id: string;
  label: string;
  num_prod: number;
  baumuster: string;
  color?: string;
  active_fail_list: ActiveFailList[];
};

export type StationsListRowsUtil = (StationsList & MapStationsLegendsToIsParallel)[][];

export type MapStationsLegendsToIsParallel = {
  legends: LegendsLabels;
  connections: ConnectionsList[] | [];
  isParallel: boolean;
  directionOfStations: DirectionOfStations;
};

export type StationItemUtil = {
  stationList: StationsList[];
  legends: LegendsLabels[];
  connections: ConnectionsList[] | [];
  directionType: DirectionType;
  compareWith?: string;
  filterStation: (value: StationsList, index: number, array: StationsList[]) => boolean;
};

export type DirectionType = 1 | 2 | 3;

export type DirectionOfStations = 'vertical' | 'horizontal';

export type LegendsLabels = {
  id: string;
  label: string;
  stations_legend: string[];
};

export type StationListGroupLineHUtil = {
  stationList: StationsList[];
  legends: LegendsLabels[];
  connections: ConnectionsList[];
};

export type ConnectionsList = {
  id: string;
  label: string;
  station_connections: string[];
};
