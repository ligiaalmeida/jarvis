import { MixSuggestionTableType, CreatorRedux } from 'types';

export const Types = {
  SELECTED: '@@mixSuggestion/SELECTED',
};

export const INITIAL_STATE = {
  tableSelected: {
    id: 0,
    type: null,
  },
};

const MixSuggestionActions = {
  tableSelected: (selected: {
    id: number;
    type: MixSuggestionTableType | null;
  }) => ({
    type: Types.SELECTED,
    payload: selected,
  }),
};

const MixSuggestion = (state = INITIAL_STATE, action: CreatorRedux) => {
  switch (action.type) {
    case Types.SELECTED:
      return { ...state, tableSelected: action.payload };
    default:
      return state;
  }
};

export { MixSuggestionActions, MixSuggestion as default };
