import { MonthlyReportPage, CreatorRedux } from 'types';

export const Types = {
  TIMER: '@@monthlyReport/TIMER',
  AUTOMATIC_MODE: '@@monthlyReport/AUTOMATIC_MODE',
  DATE: '@@monthlyReport/DATE',
  HOUR: '@@monthlyReport/HOUR',
  STATION_SELECTED: '@@monthlyReport/STATION_SELECTED',
  LOADING: '@@monthlyReport/LOADING',
};

const date = new Date();

const INITIAL_STATE: MonthlyReportPage = {
  params: {
    date: `${date.getFullYear()}-${date.getUTCMonth()}-${1}`,
  },
  station_selected: null!,
  loading: false,
};

const MonthlyReportActions = {
  setDate: (date: string) => ({
    type: Types.DATE,
    payload: {
      date,
    },
  }),
  setSelected: (station: number) => ({
    type: Types.STATION_SELECTED,
    payload: station,
  }),
  isLoading: (loading: boolean) => ({
    type: Types.LOADING,
    payload: loading,
  }),
};

const MonthlyReport = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.DATE:
      return {
        ...state,
        params: { ...state.params, date: action.payload?.date },
      };
    case Types.STATION_SELECTED:
      return {
        ...state,
        station_selected: action.payload,
      };
    case Types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export { MonthlyReportActions, MonthlyReport as default };
