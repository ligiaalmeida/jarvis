import { ColorStatusType, ConnectionsList, LegendsLabels, Stations, StationsList } from 'types';

/*=-=-=-=-=-= COMPONENTS =-=-=-=-=-=*/
export type MapStationProps<T> = {
  data: T;
};

// StationItem Component
export type StationItemProps = {
  id: number | string;
  title?: string;
  label: string;
  backgroundColor: string;
  colorStatus?: ColorStatusType;
  count: number;
};

export type StationTypeFactoryProps = {
  id: number | string;
  label: string;
  stationGroup: Stations[];
  opt?: {
    title?: string;
    backgroundColor: string;
    status: string;
    count: number;
  };
};

export type StationItemPosition = {
  id: number | string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
  customCss: string;
  colorStatus: ColorStatusType;
  color: string;
  failureActive: string;
};

export type StationItemFactoryProps = {
  label: string;
};

export type MapStationOutline = {
  id: number;
  border: BorderTypes;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
  custom: string;
  customWidth: string;
  customHeight: string;
  symbolWidth: string;
  symbolHeight: string;
};

export type BorderTypes =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'left_top_right'
  | 'left_bottom_right'
  | 'left_top'
  | 'left_bottom'
  | 'bottom_right'
  | 'top_right_bottom'
  | 'top_right';

export type StationOverviewProps = {
  data: Stations;
};

export type StationTextDescriptionProps = {
  id: string | number;
  title: string[];
  padding: string;
  gridColumn: string;
  gridRow: string;
  customCss: string | StyledISimpleInterpolation;
};

export type StationListProps = {
  stationList: {
    station_list: StationsList[];
    legends_labels: LegendsLabels[];
    connections_list: ConnectionsList[];
  };
};

/*=-=-=-=-=-= STYLES =-=-=-=-=-=*/
export type StationOverviewContainerProps = {
  backgroundColor: string;
};

export type OutlineProps = {
  cssStyle: StyledISimpleInterpolation;
};

export type ContainerStatusProps = {
  lengthCol: number;
  lengthRow: number;
};

export type MapStationContainerProps = {
  heightNav: number;
};

// StationItem
export type StationItemStyleProps = {
  backgroundColor: string;
  count: number;
  id: string;
};

// StationList Component
export type StationGroupStyleProps = {
  count: number;
};

// Legends Component
export type LegendItemStyleProps = {
  type: 'integration' | 'operating' | 'empty' | 'selected' | 'disclaimer';
};
