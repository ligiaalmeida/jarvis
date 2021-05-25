import { CreatorRedux, StationActive } from 'types';

export const Types = {
  STATION_ACTIVE: '@@currentStatus/STATION_ACTIVE',
};

const INITIAL_STATE = {
  selected: [null, ''],
  station: {
    position_id: '',
    label: '',
    num_prod: 0,
    baumuster: '',
    color: '',
    active_fail_list: [],
  },
};

const CurrentStatusActions = {
  stationActive: (station: StationActive) => ({
    type: Types.STATION_ACTIVE,
    payload: station,
  }),
};

const CurrentStatus = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.STATION_ACTIVE:
      return { ...state, station: action.payload };
    default:
      return state;
  }
};

export { CurrentStatusActions, CurrentStatus as default };
