import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CurrentFaultsActions } from 'store/ducks/currentFaults';
import { theme } from 'styles/theme';
import { useSocket } from 'hooks';
import env from 'constants/env';
import namespace from 'constants/namespace';
import payload from 'constants/payload';

import SimplifiedView from 'components/ViewMode/SimplifiedView';
import DetailedView from 'components/ViewMode/DetailedView';
import ViewingModeSetting from 'components/ViewingModeSetting';
import InputList from 'components/Pages/InputList';
import Footer from 'components/Footer';

import { Pathname, RouterProps, StateMapToPropsGlobal } from 'types';

import CurrentFaultsLoader from './CurrentFaultsLoader';
import * as S from './styles';

const CurrentFaultsPage = () => {
  const settingsPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'currentFaultsPage'>) =>
      state.currentFaultsPage
  );
  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const router = useSelector((state: RouterProps) => state.router);

  const { toggleModeView, closeDrawer } = CurrentFaultsActions;
  const dispatch = useDispatch();

  const URI_BASE =
    process.env.NODE_ENV === 'development'
      ? env.development.APP_WS_URL_BASE
      : env.host.APP_WS_URL;

  const { data } = useSocket<Pick<typeof payload, 'current_faults'>>({
    uri: URI_BASE,
    namespace: `/${settingsGlobal.building}_${namespace.CURRENT_FAULTS}`,
  });

  useEffect(() => {
    if (settingsPage.modeView === 'detailed') {
      document.body.classList.add('current-faults__bg--primary2');
    }

    return () => {
      document.body.classList.remove('current-faults__bg--primary2');
    };
  });

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Current Faults');
    console.log(data);
    console.groupEnd();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleModeView(event.target.value));

    if (settingsPage.stationActive.label) {
      dispatch(closeDrawer());
    }
  };

  return (
    <>
      <S.Main modeViewType={settingsPage.modeView}>
        <InputList
          padding={`${theme.distance.normal}rem`}
          pathname={router.location.pathname as Pathname}
        >
          <S.Signals modeViewType={settingsPage.modeView}>
            <h3>
              Quantidade de sinais de falhas monitorados na linha:{' '}
              <span>24</span>
            </h3>
          </S.Signals>
          <ViewingModeSetting
            pageName="currentFaultsPage"
            toggleNavigation={settingsGlobal.toggleNavigation}
            handleChange={handleChange}
          />
        </InputList>

        {!data && (
          <S.Loader>
            <CurrentFaultsLoader />
          </S.Loader>
        )}
        {data && settingsPage.modeView === 'simplified' && (
          <SimplifiedView namespace="currentFaultsPage" message={data} />
        )}
        {data && settingsPage.modeView === 'detailed' && (
          <DetailedView namespace="currentFaultsPage" message={data} />
        )}
      </S.Main>
      <Footer />
    </>
  );
};

export default CurrentFaultsPage;
