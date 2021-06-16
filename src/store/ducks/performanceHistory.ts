import { CreatorRedux, RangeAutomaticTimer } from 'types';

export const Types = {
  TIMER: '@@performanceHistory/TIMER',
  HOUR: '@@performanceHistory/HOUR',
  DATE: '@@performanceHistory/DATE',
  AUTOMATIC_MODE: '@@performanceHistory/AUTOMATIC_MODE',
};

const date = new Date();

const INITIAL_STATE = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  params: {
    date: `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
    hour: date.getUTCHours(),
  },
};

const PerformanceHistoryActions = {
  timer: (seconds: RangeAutomaticTimer) => ({
    type: Types.TIMER,
    payload: {
      seconds,
    },
  }),
  toggleAutomaticMode: (mode: boolean) => ({
    type: Types.AUTOMATIC_MODE,
    payload: {
      mode,
    },
  }),
  setDate: (date: string) => ({
    type: Types.DATE,
    payload: {
      date,
    },
  }),
  setHour: (hour: number) => ({
    type: Types.HOUR,
    payload: {
      hour,
    },
  }),
};

const PerformanceHistory = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.TIMER:
      return {
        ...state,
        timer: { ...state.timer, timer: action.payload?.seconds },
      };
    case Types.AUTOMATIC_MODE:
      return {
        ...state,
        timer: { ...state.timer, automaticMode: action.payload?.mode },
      };
    case Types.DATE:
      return {
        ...state,
        params: { ...state.params, date: action.payload?.date },
      };
    case Types.HOUR:
      return {
        ...state,
        params: { ...state.params, hour: action.payload?.hour },
      };
    default:
      return state;
  }
};

export { PerformanceHistoryActions, PerformanceHistory as default };
