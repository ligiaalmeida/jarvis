import React from 'react';
import { useSelector } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio } from '@material-ui/core';

import {
  Pathname,
  StateMapToPropsGlobal,
  StateMapToRouterProps,
  PageStorageDefault,
} from 'types';
import * as Types from './types';

import * as S from './styles';
import { History } from 'history';

const ViewingModeSetting: React.FC<
  Types.ViewingModeSettingProps<React.ChangeEvent<HTMLInputElement>>
> = ({ pageName = 'currentFaultsPage', toggleNavigation, handleChange }) => {
  const settingsPage = useSelector(
    (state: StateMapToPropsGlobal) => state[pageName]
  );
  const history = useSelector(
    (state: StateMapToRouterProps<History>) => state.router
  );

  return (
    <S.SettingsPage
      pathname={history.location.pathname as Pathname}
      modeViewType={(settingsPage as PageStorageDefault).modeView}
      toggleNavigation={toggleNavigation}
      isLabelType={
        (settingsPage as PageStorageDefault).modeView === 'simplified'
      }
    >
      <RadioGroup
        row
        aria-label="position"
        classes={{ row: 'mode-view__row' }}
        onChange={handleChange}
        name="mode-view"
        value={(settingsPage as PageStorageDefault).modeView}
      >
        <FormControlLabel
          value="simplified"
          classes={{
            root:
              (settingsPage as PageStorageDefault).modeView === 'simplified'
                ? 'mode-view__label mode-view__simplified'
                : 'mode-view__label',
          }}
          control={<Radio classes={{ colorSecondary: 'mode-view__radio' }} />}
          label="Modo simplificado"
          labelPlacement="end"
        />
        <FormControlLabel
          value="detailed"
          control={<Radio classes={{ colorSecondary: 'mode-view__radio' }} />}
          classes={{
            root:
              (settingsPage as PageStorageDefault).modeView === 'detailed'
                ? 'mode-view__label mode-view__detailed'
                : 'mode-view__label',
          }}
          label="Modo detalhado"
          labelPlacement="end"
        />
      </RadioGroup>
    </S.SettingsPage>
  );
};

export default ViewingModeSetting;
