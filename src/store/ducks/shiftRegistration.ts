import { CreatorRedux, Polices } from 'types';

export const Types = {
  SHIFT_REGISTRATION: '@@shiftRegistration/SHIFT_REGISTRATION',
  EDIT: '@@shiftRegistration/EDIT',
};

const INITIAL_STATE = {
  edit: false,
  shifts: [
    {
      shift_name: '',
      hour_start: '',
      hour_end: '',
    },
  ],
};

const ShiftRegistrationActions = {
  shifts: (shifts: boolean) => ({
    type: Types.SHIFT_REGISTRATION,
    payload: shifts,
  }),
  edit: (edit: boolean) => ({
    type: Types.EDIT,
    payload: edit,
  }),
};

const ShiftRegistration = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.SHIFT_REGISTRATION:
      return { ...state, shifts: action.payload };
    case Types.EDIT:
      return { ...state, edit: action.payload };
    default:
      return state;
  }
};

export { ShiftRegistrationActions, ShiftRegistration as default };
