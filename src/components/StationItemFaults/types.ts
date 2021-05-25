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

export type StationItemFaultsProps = {
  id: string;
  typeView?: ModeView;
  data: CurrentFaultsPayload | FaultPredictionPayload;
  namespace?: KeysOfPagesContainingStations;
  isOnClick?: boolean;
};

export type FaultItem = {
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
  fail_list: FaultItem[];
  rfid_time: PayloadDataTimeDefault;
  area_invasion_time: PayloadDataTimeDefault;
  line_stoppage_time: PayloadDataTimeDefault;
  accumulated_stop_time: PayloadDataTimeDefault;
};

export type FaultPredictionPayload = {
  label: string;
  stop_fail_list: FaultItem[];
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

export type FaultListRowProps = {
  countChildrenFail?: number;
};
