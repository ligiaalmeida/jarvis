import { CreatorRedux } from 'types';
import { CurrentFaultsPayload } from 'components/StationItemFaults/types';

export const Types = {
  TIMER: '@@currentFaults/TIMER',
  TOGGLE_MODE_VIEW: '@@currentFaults/TOGGLE_MODE_VIEW',
  STATION_ACTIVE: '@@currentFaults/STATION_ACTIVE',
  CLOSE_DRAWER: '@@currentFaults/CLOSE_DRAWER',
  AUTOMATIC_MODE: '@@currentFaults/AUTOMATIC_MODE',
};

export const INITIAL_STATE = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  modeView: 'simplified',
  stationActive: {
    label: '',
    fail_list: [
      {
        name: '',
        quantity: 0,
        duration: '0',
        gravity: 0,
        event_list: [
          {
            start_timestamp: 0,
            duration: '0',
          },
        ],
      },
    ],
    rfid_time: {
      label: '',
      duration: '',
    },
    area_invasion_time: {
      label: '',
      duration: '',
    },
    line_stoppage_time: {
      label: '',
      duration: '',
    },
    accumulated_stop_time: {
      label: '',
      duration: '',
    },
  },
};

const CurrentFaultsActions = {
  closeDrawer: () => ({
    type: Types.CLOSE_DRAWER,
    payload: {
      data: INITIAL_STATE.stationActive,
    },
  }),
  stationActive: (data: CurrentFaultsPayload) => ({
    type: Types.STATION_ACTIVE,
    payload: {
      data,
    },
  }),
  timer: (seconds: RangeAutomaticTimer) => ({
    type: Types.TIMER,
    payload: {
      seconds,
    },
  }),
  toggleModeView: (type: string) => ({
    type: Types.TOGGLE_MODE_VIEW,
    payload: {
      type,
    },
  }),
  toggleAutomaticMode: (mode: boolean) => ({
    type: Types.AUTOMATIC_MODE,
    payload: {
      mode,
    },
  }),
};

const CurrentFaults = (state = INITIAL_STATE, action: CreatorRedux) => {
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
    case Types.TOGGLE_MODE_VIEW:
      return { ...state, modeView: action.payload?.type };
    case Types.STATION_ACTIVE:
      return { ...state, stationActive: action.payload?.data };
    case Types.CLOSE_DRAWER:
      return { ...state, stationActive: action.payload?.data };
    default:
      return state;
  }
};

export { CurrentFaultsActions, CurrentFaults as default };
