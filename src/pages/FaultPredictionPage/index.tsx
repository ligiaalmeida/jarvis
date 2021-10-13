import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { theme } from 'styles/theme';
import { useWindowWidth, useSocket } from 'hooks';
import { FaultPredictionActions } from 'store/ducks/faultPrediction';
import env from 'constants/env';
import namespace from 'constants/namespace';
import payload from 'constants/payload';

import SimplifiedView from 'components/ViewMode/SimplifiedView';
import DetailedView from 'components/ViewMode/DetailedView';
import ViewingModeSetting from 'components/ViewingModeSetting';
import InputList from 'components/Pages/InputList';
import Footer from 'components/Footer';

import { StateMapToPropsGlobal, ModeView, Pathname, RouterProps } from 'types';

import CurrentFaultsLoader from './CurrentFaultsLoader';
import * as S from './styles';

const FaultPredictionPage = () => {
  const [heightNavigation, setHeightNavigation] = useState(0);

  const settingsPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'faultPredictionPage'>) =>
      state.faultPredictionPage
  );
  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const router = useSelector((state: RouterProps) => state.router);

  const { toggleModeView } = FaultPredictionActions;
  const dispatch = useDispatch();
  const width = useWindowWidth();

  const URI_BASE =
    process.env.NODE_ENV === 'development'
      ? env.development.APP_WS_URL_BASE
      : env.host.APP_WS_URL;

  const { data } = useSocket<Pick<typeof payload, 'fault_prediction'>>({
    uri: URI_BASE,
    namespace: `/${settingsGlobal.building}_${namespace.FAULT_PREDICTION}`,
  });

  // const dataMock = payload;

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Fault Prediction');
    console.log(data);
    console.groupEnd();
  }

  useEffect(() => {
    if (settingsPage.modeView === 'detailed') {
      document.body.classList.add('fault-prediction__bg--primary2');
    }

    return () => {
      document.body.classList.remove('fault-prediction__bg--primary2');
    };
  });

  useEffect(() => {
    const height = document.querySelector('#root > #navigation');
    setHeightNavigation(Math.floor(height?.clientHeight as number));
  }, [width, heightNavigation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleModeView(event.target.value as ModeView));
  };

  return (
    <>
      <S.Main modeViewType={settingsPage?.modeView}>
        <InputList
          padding={`${theme.distance.normal}rem`}
          pathname={router.location.pathname as Pathname}
        >
          <ViewingModeSetting
            pageName="faultPredictionPage"
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
          <SimplifiedView namespace="faultPredictionPage" message={data} />
        )}
        {data && settingsPage.modeView === 'detailed' && (
          <DetailedView namespace="faultPredictionPage" message={data} />
        )}
      </S.Main>
      <Footer />
    </>
  );
};

export default FaultPredictionPage;
