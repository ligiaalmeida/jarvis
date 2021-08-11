import { ActiveFailList, ModeView, PagesSettingsTimer, PerformancePageStorage } from 'types';
import { CurrentFaultsPayload } from 'components/StationItemFaults/types';

export type InitialStateGlobal = {
  toggleHeader: boolean;
  toggleNavigation: boolean;
  heightNavigation: number;
  building: Buildings;
};

export interface StateMapToPropsGlobal {
  polices: SignInPage;
  global: InitialStateGlobal;
  authPage?: {
    isConnected: boolean;
    config: {
      polices: Array<string>;
    };
  };
  performancePage: PerformancePageStorage;
  currentStatusPage: {
    selected: [number, string];
    toggleCard: boolean;
    station: StationActive;
  };
  currentFaultsPage: CurrentFaultsPageStorage;
  faultPredictionPage: FaultsPredictionPageStorage;
  performanceHistoryPage: {
    params: {
      date: string;
      hour: number;
    };
  } & Omit<PagesContainingTimerAndModeView, 'stationActive'>;
  monthlyReportPage: {
    params: {
      date: string;
    };
    station_selected: number;
    loading: boolean;
  };
  mixSuggestionPage: {
    tableSelected: {
      id: number;
      type: MixSuggestionTableType | null;
    };
  };
  shiftRegistrationPage: {
    shifts: ShiftRegistrationType[];
  };
}

export type ShiftRegistrationType = {
  idShift: number;
  shiftName: string;
  hourStartShift: string;
  hourEndShift: string;
};

export type MixSuggestionTableType = 'scheduled' | 'suggested';

export type SignInPage = {
  isConnected: boolean;
  config: {
    polices: Polices[];
  };
};

export type Polices = {
  label: string;
  nome: string;
  menu_item: {
    label: '';
    name: '';
  }[];
};

export type KeysOfPagesContainingStations = 'currentFaultsPage' | 'faultPredictionPage';

export type KeyOfPages = keyof StateMapToPropsGlobal;

export type KeysOfPagesContainingTimer =
  | 'currentFaultsPage'
  | 'performancePage'
  | 'faultPredictionPage'
  | 'performanceHistoryPage';

export interface StateMapToRouterProps<RouterHistory> {
  router: RouterHistory;
}

export type StationActive = {
  position_id: string;
  label: string;
  num_prod: number;
  baumuster: string;
  color: string;
  active_fail_list: ActiveFailList | [];
};

export type RouterProps = {
  router: {
    action: string;
    location: Location;
  };
};

export type CreatorRedux = {
  type: string;
  payload?: {
    [key: string]: number | string;
  };
};

export interface PagesContainingTimerAndModeView {
  timer: PagesSettingsTimer;
  modeView: ModeView;
  stationActive: CurrentFaultsPayload;
}

export type CurrentFaultsPageStorage = PagesContainingTimerAndModeView;

export type FaultsPredictionPageStorage = PagesContainingTimerAndModeView;

export type MonthlyReportPage = {
  params: {
    date: string;
  };
  station_selected: number;
  loading: boolean;
};

export type Buildings = 'line_h' | 'line_mci' | 'line_trim';
