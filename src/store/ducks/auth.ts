import { CreatorRedux, Polices } from 'types';

export const Types = {
  IS_LOGIN: '@@auth/IS_LOGIN',
  POLICES: '@@auth/POLICES',
};

const INITIAL_STATE = {
  isConnected: false,
  config: {
    polices: [
      {
        label: '',
        nome: '',
        menu_item: [
          {
            label: '',
            name: '',
          },
        ],
      },
    ],
  },
};

const SignInActions = {
  isLogin: (isLogin: boolean) => ({
    type: Types.IS_LOGIN,
    payload: isLogin,
  }),
  polices: (rules: Polices) => ({
    type: Types.POLICES,
    payload: rules,
  }),
};

const SignIn = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.IS_LOGIN:
      return { ...state, isConnected: action.payload };
    case Types.POLICES:
      return { ...state, config: { polices: action.payload } };
    default:
      return state;
  }
};

export { SignInActions, SignIn as default };
