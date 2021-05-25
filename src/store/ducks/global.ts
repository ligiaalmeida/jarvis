import { theme } from 'styles/theme';

import { InitialStateGlobal, Buildings, CreatorRedux } from 'types';

export const Types = {
  TOGGLE_HEADER: '@@global/TOGGLE_HEADER',
  TOGGLE_NAVIGATION: '@@global/TOGGLE_NAVIGATION',
  HEIGHT_NAVIGATION: '@@global/HEIGHT_NAVIGATION',
  BUILDING: '@@global/BUILDING',
  IS_DATA: '@@global/IS_DATA',
};

const INITIAL_STATE: InitialStateGlobal = {
  toggleHeader: true,
  toggleNavigation: true,
  heightNavigation: theme.layout.navigation.height.on,
  building: 'line_h',
};

const GlobalActions = {
  toggleHeader: (toggle: boolean) => ({
    type: Types.TOGGLE_HEADER,
    payload: {
      toggle,
    },
  }),
  toggleNavigation: (toggle: boolean) => ({
    type: Types.TOGGLE_NAVIGATION,
    payload: {
      toggle,
    },
  }),
  setHeightNavigation: (height: number) => ({
    type: Types.HEIGHT_NAVIGATION,
    payload: {
      height,
    },
  }),

  setBuilding: (building: Buildings) => ({
    type: Types.BUILDING,
    payload: {
      building,
    },
  }),
};

const Global = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.TOGGLE_HEADER:
      return { ...state, toggleHeader: action.payload?.toggle };
    case Types.TOGGLE_NAVIGATION:
      return { ...state, toggleNavigation: action.payload?.toggle };
    case Types.HEIGHT_NAVIGATION:
      return { ...state, heightNavigation: action.payload?.height };
    case Types.BUILDING:
      return { ...state, building: action.payload?.building };
    default:
      return state;
  }
};

export { GlobalActions, Global as default };
