import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { theme } from 'styles/theme';
import { useWindowWidth, useSocket } from 'hooks';
import env from 'constants/env';
import namespace from 'constants/namespace';
import payload from 'constants/payload';

import SimplifiedView from 'components/ViewMode/SimplifiedView';
import InputList from 'components/Pages/InputList';
import Footer from 'components/Footer';

import { StateMapToPropsGlobal, Pathname, RouterProps } from 'types';

import CurrentFaultsLoader from './CurrentFaultsLoader';
import * as S from './styles';

const FaultPredictionPage = () => {
  const [heightNavigation, setHeightNavigation] = useState(0);

  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const router = useSelector((state: RouterProps) => state.router);

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
    const height = document.querySelector('#root > #navigation');
    setHeightNavigation(Math.floor(height?.clientHeight as number));
  }, [width, heightNavigation]);

  return (
    <>
      <S.Main>
        <InputList
          padding={`${theme.distance.normal}rem`}
          pathname={router.location.pathname as Pathname}
        />
        {!data ? (
          <S.Loader>
            <CurrentFaultsLoader />
          </S.Loader>
        ) : (
          <SimplifiedView namespace="faultPredictionPage" message={data} />
        )}
      </S.Main>
      <Footer />
    </>
  );
};

export default FaultPredictionPage;
