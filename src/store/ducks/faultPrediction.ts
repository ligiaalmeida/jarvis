import { ModeView, CreatorRedux } from 'types';

export const Types = {
  TIMER: '@@faultPrediction/TIMER',
  TOGGLE_MODE_VIEW: '@@faultPrediction/TOGGLE_MODE_VIEW',
  AUTOMATIC_MODE: '@@faultPrediction/AUTOMATIC_MODE',
};

export const INITIAL_STATE = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  modeView: 'simplified',
};

const FaultPredictionActions = {
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
    default:
      return state;
  }
};

export { FaultPredictionActions, FaultPrediction as default };
