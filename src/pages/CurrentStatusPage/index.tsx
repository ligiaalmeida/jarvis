import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { theme } from 'styles/theme';
import { useSocket } from 'hooks';
import payload from 'constants/payload';
import env from 'constants/env';
import namespace from 'constants/namespace';

import InputList from 'components/Pages/InputList';
import Footer from 'components/Footer';

import { StateMapToPropsGlobal, Pathname, RouterProps } from 'types';

import StationList from './StatiosList';

import * as S from './styles';

const CurrentStatusPage = () => {
  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const router = useSelector((state: RouterProps) => state.router);

  const URI_BASE =
    process.env.NODE_ENV === 'development'
      ? env.development.APP_WS_URL_BASE
      : env.host.APP_WS_URL;

  const { data } = useSocket<Pick<typeof payload, 'current_status'>>({
    uri: URI_BASE,
    namespace: `/${settingsGlobal.building}_${namespace.CURRENT_STATUS}`,
  });

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Current Status');
    console.log(data);
    console.groupEnd();
  }

  return (
    <>
      <S.Main>
        <InputList
          pathname={router.location.pathname as Pathname}
          padding={`${theme.distance.normal}rem 0`}
        />
        {data && <StationList stationList={data.current_status} />}
      </S.Main>
      <Footer />
    </>
  );
};

export default CurrentStatusPage;
