import { CreatorRedux, RangeAutomaticTimer } from 'types';

export const Types = {
  TIMER: '@@performance/TIMER',
  AUTOMATIC_MODE: '@@performance/AUTOMATIC_MODE',
  ZOOM_MODE: '@@performance/ZOOM_MODE',
};

const INITIAL_STATE = {
  timer: {
    automaticMode: false,
    timer: 30,
  },
  zoom: 0,
};

const PerformanceActions = {
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
  zoomMode: (zoom: number) => ({
    type: Types.ZOOM_MODE,
    payload: {
      zoom,
    },
  }),
};

const Performance = (state = INITIAL_STATE, action: CreatorRedux) => {
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
    case Types.ZOOM_MODE:
      return {
        ...state,
        zoom: action.payload?.zoom,
      };
    default:
      return state;
  }
};

export { PerformanceActions, Performance as default };
