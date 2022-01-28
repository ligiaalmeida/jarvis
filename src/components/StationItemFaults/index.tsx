import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { History } from 'history';

import { CurrentFaultsActions } from 'store/ducks/currentFaults';

import routes from 'constants/routes';

import { StateMapToRouterProps, StateMapToPropsGlobal } from 'types';
import * as Types from './types';

import * as S from './styles';

const StationItemFaults: React.FC<Types.StationItemFaultsProps> = ({
  data,
  isOnClick = false,
  typeView,
  namespace,
}) => {
  const history = useSelector(
    (state: StateMapToRouterProps<History>) => state.router
  );
  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const currentFaultsPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'currentFaultsPage'>) =>
      state.currentFaultsPage
  );
  const [innerHeightScreen, setInnerHeightScreen] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const { stationActive } = CurrentFaultsActions;
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
    <>
      {namespace === 'currentFaultsPage' && (
        <S.StationItemFaultsContainer
          countRows={3}
          isSelected={currentFaultsPage.stationActive.label === data.label}
          typeView={typeView}
          onClick={() => {
            dispatch(stationActive(data as Types.CurrentFaultsPayload));
          }}
          isNavigation={
            !settingsGlobal.toggleNavigation &&
            currentFaultsPage.modeView === 'simplified' &&
            history.location.pathname === routes.CURRENT_FAULTS
          }
          heightScreen={settingsGlobal.heightNavigation}
        >
          <S.Wrapper>
            <S.Header>
              <p>{data.label}</p>
            </S.Header>
            <S.FailList>
              {data &&
                (data as Types.CurrentFaultsPayload).fail_list
                  .sort((failA, failB) => {
                    if (failA.gravity < failB.gravity) return 1;
                    if (failA.gravity > failB.gravity) return -1;
                    return 0;
                  })
                  .map((fail, idx) => (
                    <S.FailItem key={`${fail.name}_${idx}`} color={fail.color}>
                      {fail.label}
                    </S.FailItem>
                  ))}
            </S.FailList>
            {(data as Types.CurrentFaultsPayload).fail_list.length > 6 && (
              <S.Footer>
                <span>
                  Total de falhas:{' '}
                  {(data as Types.CurrentFaultsPayload).fail_list.length}
                </span>
                <span>&nbsp;</span>
              </S.Footer>
            )}
            {innerHeightScreen[0] >= 1280 &&
              innerHeightScreen[1] <= 900 &&
              (data as Types.CurrentFaultsPayload).fail_list.length > 2 && (
                <S.Footer>
                  <span>
                    Total de falhas:{' '}
                    {(data as Types.CurrentFaultsPayload).fail_list.length}
                  </span>
                  <span>&nbsp;</span>
                </S.Footer>
              )}
          </S.Wrapper>
        </S.StationItemFaultsContainer>
      )}

      {namespace === 'faultPredictionPage' && (
        <S.StationItemFaultsContainer
          countRows={3}
          isSelected={currentFaultsPage.stationActive.label === data.label}
          typeView={typeView}
          isNavigation={
            !settingsGlobal.toggleNavigation &&
            currentFaultsPage.modeView === 'simplified' &&
            history.location.pathname === routes.FAULT_PREDICTION
          }
          heightScreen={settingsGlobal.heightNavigation}
        >
          <S.Wrapper>
            <S.Header>
              <p>{data.label}</p>
            </S.Header>
            <S.FailList>
              {data &&
                (data as Types.FaultPredictionPayload).stop_fail_list
                  .sort((failA, failB) => {
                    if (failA.gravity < failB.gravity) return 1;
                    if (failA.gravity > failB.gravity) return -1;
                    return 0;
                  })
                  .map((fail, idx) => (
                    <S.FailItem key={`${fail.name}_${idx}`} color={fail.color}>
                      {fail.name}
                    </S.FailItem>
                  ))}
            </S.FailList>
            {(data as Types.FaultPredictionPayload).stop_fail_list.length >
              0 && (
              <S.Footer>
                <span>
                  Total de falhas:{' '}
                  {(data as Types.FaultPredictionPayload).stop_fail_list.length}
                </span>
                <span>&nbsp;</span>
              </S.Footer>
            )}
          </S.Wrapper>
        </S.StationItemFaultsContainer>
      )}
    </>
  );
};

export default StationItemFaults;
