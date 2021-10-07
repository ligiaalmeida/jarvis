import {
  CreatorRedux,
  ShiftRegistrationType,
  ShiftRegistrationList,
  shiftCancel,
} from 'types';

export const Types = {
  SHIFT_REGISTRATION: '@@shiftRegistration/SHIFT_REGISTRATION',
  ADD_SHIFT: '@@shiftRegistration/ADD_SHIFT',
  GET_LIST_COMPLETED: '@@shiftRegistration/GET_LIST_COMPLETED',
  REMOVE_FROM_LIST: '@@shiftRegistration/REMOVE_FROM_LIST',
  CANCEL_SHIFT: '@@shiftRegistration/CANCEL_SHIFT',
};

const INITIAL_STATE = {
  shiftRegistrationPage: {
    id_shift: '',
    shift_name: '',
    hour_start_shift: '',
    hour_end_shift: '',
  },
  shift: {
    id_shift: '',
    shift_name: '',
    hour_start_shift: '',
    hour_end_shift: '',
  },
  shiftRegistrationList: [],
  shiftCancel: false,
};

const ShiftRegistrationActions = {
  addShift: (addShift: ShiftRegistrationType) => ({
    type: Types.ADD_SHIFT,
    payload: addShift,
  }),
  shift: (shift: ShiftRegistrationType) => ({
    type: Types.SHIFT_REGISTRATION,
    payload: shift,
  }),
  getList: (shiftRegistrationList: ShiftRegistrationList) => ({
    type: Types.GET_LIST_COMPLETED,
    payload: shiftRegistrationList,
  }),
  removeShift: (shift: ShiftRegistrationType) => ({
    type: Types.REMOVE_FROM_LIST,
    payload: shift,
  }),
  toCancel: (shiftCancel: shiftCancel) => ({
    type: Types.CANCEL_SHIFT,
    payload: shiftCancel,
  }),
};

const ShiftRegistration = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.SHIFT_REGISTRATION:
      return {
        ...state,
        shiftRegistrationPage: action.payload?.shiftRegistrationPage,
      };
    case Types.ADD_SHIFT:
      return {
        ...state,
        shiftRegistrationList: [
          ...state.shiftRegistrationList,
          action.payload?.addShift,
        ],
      };
    case Types.GET_LIST_COMPLETED:
      return {
        ...state,
        shiftRegistrationList: action.payload,
      };
    case Types.REMOVE_FROM_LIST:
      return {
        ...state,
        shift: action.payload?.shift,
      };
    case Types.CANCEL_SHIFT:
      return {
        ...state,
        shiftCancel: action.payload,
      };
    default:
      return state;
  }
};

export { ShiftRegistrationActions, ShiftRegistration as default };
