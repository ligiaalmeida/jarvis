import { ModeView, KeysOfPagesContainingStations } from 'types';

/*=-=-=-=-=-= COMPONENT =-=-=-=-=-=*/
export type StationItemFaultsContainer = {
  width?: number;
  countRows: number;
  heightScreen: number;
  isNavigation?: boolean;
  isSelected?: boolean;
  typeView?: ModeView;
};

export type StationItemCurrentFaultsProps = {
  id: string;
  typeView?: ModeView;
  data: CurrentFaultsPayload;
  namespace?: KeysOfPagesContainingStations;
  isOnClick?: boolean;
};

export type StationItemFaultPredictionProps = {
  id: string;
  typeView?: ModeView;
  data: FaultPredictionPayload;
  namespace?: KeysOfPagesContainingStations;
  isOnClick?: boolean;
};

export type CurrentFaultItem = {
  name: string;
  label: string;
  quantity: number;
  duration: string;
  gravity: number;
  color: string;
  event_list: {
    start_timestamp: number;
    duration: string;
  }[];
};

export type CurrentFaultsPayload = {
  label: string;
  fail_list: CurrentFaultItem[];
  rfid_time: PayloadDataTimeDefault;
  area_invasion_time: PayloadDataTimeDefault;
  line_stoppage_time: PayloadDataTimeDefault;
  accumulated_stop_time: PayloadDataTimeDefault;
};

export type PredictedFaultItem = {
  fail_name: string;
  equipment: number;
  analog_signals: {
    name: string;
    standard_value: number;
    changed_value: number;
    percentage_changed: number;
  }[];
};

export type FaultPredictionPayload = {
  label: string;
  circuit?: string;
  stop_fail_list: PredictedFaultItem[];
};

type PayloadDataTimeDefault = {
  label: string;
  duration: string;
};

/*=-=-=-=-=-= STYLES =-=-=-=-=-=*/

export type FailItemProps = {
  gravity?: number;
  color: string;
};

export type FailListProps = {
  from?: string;
};

export type FaultListRowProps = {
  countChildrenFail?: number;
};
