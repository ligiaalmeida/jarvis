import {
  CreatorRedux,
  ShiftRegistrationType,
  ShiftRegistrationList,
  CancelAddShift,
} from 'types';

export const Types = {
  ADD_SHIFT: '@@shiftRegistration/ADD_SHIFT',
  CANCEL_ADD_SHIFT: '@@shiftRegistration/CANCEL_ADD_SHIFT',
  EDIT_SHIFT: '@@shiftRegistration/EDIT_SHIFT',
  GET_LIST_COMPLETED: '@@shiftRegistration/GET_LIST_COMPLETED',
  REMOVE_SHIFT: '@@shiftRegistration/REMOVE_SHIFT',
};

const INITIAL_STATE = {
  cancelAddShift: false,
  shiftRegistrationList: [],
};

const ShiftRegistrationActions = {
  addShift: (shift: ShiftRegistrationType) => ({
    type: Types.ADD_SHIFT,
    payload: shift,
  }),
  cancelAddShift: (cancelAddShift: CancelAddShift) => ({
    type: Types.CANCEL_ADD_SHIFT,
    payload: cancelAddShift,
  }),
  editShift: (shift: ShiftRegistrationType) => ({
    type: Types.EDIT_SHIFT,
    payload: shift,
  }),
  getList: (shiftRegistrationList: ShiftRegistrationList) => ({
    type: Types.GET_LIST_COMPLETED,
    payload: shiftRegistrationList,
  }),
  removeShift: (shift: ShiftRegistrationType) => ({
    type: Types.REMOVE_SHIFT,
    payload: shift,
  }),
};

const ShiftRegistration = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.ADD_SHIFT:
      return {
        ...state,
        shiftRegistrationList: [...state.shiftRegistrationList, action.payload],
      };
    case Types.CANCEL_ADD_SHIFT:
      return {
        ...state,
        cancelAddShift: action.payload,
      };
    case Types.EDIT_SHIFT:
      return {
        ...state,
        shiftRegistrationList: state.shiftRegistrationList.map(
          (item: ShiftRegistrationType) =>
            item.id_shift === action.payload?.id_shift
              ? {
                  ...item,
                  id_shift: action.payload?.id_shift,
                  shift_name: action.payload?.shift_name,
                  hour_start_shift: action.payload?.hour_start_shift,
                  hour_end_shift: action.payload?.hour_end_shift,
                }
              : item
        ),
      };
    case Types.GET_LIST_COMPLETED:
      return {
        ...state,
        shiftRegistrationList: action.payload,
      };
    case Types.REMOVE_SHIFT:
      return {
        ...state,
        shiftRegistrationList: state.shiftRegistrationList.filter(
          (item) => item !== action.payload
        ),
      };
    default:
      return state;
  }
};

export { ShiftRegistrationActions, ShiftRegistration as default };
