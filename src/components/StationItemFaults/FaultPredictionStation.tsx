import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { History } from 'history';

import { FaultPredictionActions } from 'store/ducks/faultPrediction';

import routes from 'constants/routes';

import { StateMapToRouterProps, StateMapToPropsGlobal } from 'types';
import * as Types from './types';

import * as S from './styles';

const FaultPredictionStation: React.FC<
  Types.StationItemFaultPredictionProps
> = ({ data, isOnClick = false, typeView }) => {
  const history = useSelector(
    (state: StateMapToRouterProps<History>) => state.router
  );
  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const faultPredictionPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'faultPredictionPage'>) =>
      state.faultPredictionPage
  );
  const [innerHeightScreen, setInnerHeightScreen] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const { stationActive } = FaultPredictionActions;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () =>
      setInnerHeightScreen([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <S.StationItemFaultsContainer
      countRows={3}
      isSelected={faultPredictionPage.stationActive.label === data.label}
      typeView={typeView}
      onClick={() => {
        if (isOnClick)
          dispatch(stationActive(data as Types.FaultPredictionPayload));
      }}
      isNavigation={
        !settingsGlobal.toggleNavigation &&
        faultPredictionPage.modeView === 'simplified' &&
        history.location.pathname === routes.FAULT_PREDICTION
      }
      heightScreen={settingsGlobal.heightNavigation}
    >
      <S.Wrapper>
        <S.Header>
          <p>{data.label}</p>
        </S.Header>
        <S.FailList from={routes.FAULT_PREDICTION}>
          {data &&
            (data as Types.FaultPredictionPayload).stop_fail_list.map(
              (fail, idx) => {
                return (
                  <S.FailLabel key={`${fail.label}_${idx}`}>
                    <span>{fail.label}</span>
                  </S.FailLabel>
                );
              }
            )}
        </S.FailList>
      </S.Wrapper>
    </S.StationItemFaultsContainer>
  );
};

export default FaultPredictionStation;
