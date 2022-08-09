import { FaultPredictionPayload } from 'components/StationItemFaults/types';
import { ModeView, CreatorRedux, RangeAutomaticTimer } from 'types';

export const Types = {
  TIMER: '@@faultPrediction/TIMER',
  TOGGLE_MODE_VIEW: '@@faultPrediction/TOGGLE_MODE_VIEW',
  STATION_ACTIVE: '@@faultPrediction/STATION_ACTIVE',
  CLOSE_DRAWER: '@@faultPrediction/CLOSE_DRAWER',
  AUTOMATIC_MODE: '@@faultPrediction/AUTOMATIC_MODE',
};

export const INITIAL_STATE = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  modeView: 'simplified',
  stationActive: {
    label: '',
    circuit: '',
    stop_fail_list: [
      {
        fail_name: '',
        equipment: 0,
        analog_signals: [
          {
            name: '',
            standard_value: '',
            changed_value: '',
            percentage_changed: '',
          },
        ],
      },
    ],
  },
};

const FaultPredictionActions = {
  closeDrawer: () => ({
    type: Types.CLOSE_DRAWER,
    payload: {
      data: INITIAL_STATE.stationActive,
    },
  }),
  stationActive: (data: FaultPredictionPayload) => ({
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
  toggleAutomaticMode: (mode: boolean) => ({
    type: Types.AUTOMATIC_MODE,
    payload: {
      mode,
    },
  }),
  toggleModeView: (type: ModeView) => ({
    type: Types.TOGGLE_MODE_VIEW,
    payload: {
      type,
    },
  }),
};

const FaultPrediction = (state = INITIAL_STATE, action: CreatorRedux) => {
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

export { FaultPredictionActions, FaultPrediction as default };
