import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Divider } from '@material-ui/core';

import { FaultPredictionActions } from 'store/ducks/faultPrediction';
import { useWindowWidth, useClickOutside } from 'hooks';

import FaultPredictionStation from 'components/StationItemFaults/FaultPredictionStation';
import MessageError from 'components/Messages/Error';
import Error from 'components/Icons/Error';
import texts from 'components/ViewMode/texts';

import {
  FaultPredictionPayload,
  PredictedFaultItem,
} from 'components/StationItemFaults/types';
import { StateMapToPropsGlobal } from 'types';
import * as Types from '../types';

import AnalogSignalsTable from './AnalogSignalsTable';
import * as S from './styles';

const DetailedView = ({
  message,
  namespace = 'faultPredictionPage',
  isDrawerDetails = true,
}: Types.SimplifiedViewProps) => {
  const [countChildrenRow, setCountChildrenRow] = useState(4);
  const [countChildrenFail, setCountChildrenFail] = useState(3);
  const [failActive, setFailActive] = useState('');

  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const stationSelected = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'faultPredictionPage'>) =>
      state.faultPredictionPage.stationActive
  );
  const data: Array<React.ReactElement>[] = [[]];
  const idChildren: Array<string>[] = [[]];
  const failList: Array<typeof stationSelected.stop_fail_list> = [[]];
  const payload: FaultPredictionPayload[] = message
    ? message?.filter(
        (station: { stop_fail_list: PredictedFaultItem[] }) =>
          station.stop_fail_list.length > 0
      )
    : [];

  const screen = useWindowWidth();
  const refEventList = useRef<HTMLDivElement>(null!);

  useClickOutside(refEventList, () => {
    if (failActive) setFailActive('');
  });

  const { closeDrawer, stationActive } = FaultPredictionActions;
  const dispatch = useDispatch();

  (payload as FaultPredictionPayload[])?.map((station, idx) => {
    if (idx > 0 && idx % countChildrenRow === 0) {
      data.push([]);
      idChildren.push([]);
    }

    data[data.length - 1].push(
      <FaultPredictionStation
        key={station.label}
        id={`${station.label}`}
        data={station}
        isOnClick={isDrawerDetails}
      />
    );

    idChildren[data.length - 1].push(station.label);
  });

  stationSelected.stop_fail_list.map(
    (failItem: PredictedFaultItem, failIdx: number) => {
      if (failIdx > 0 && failIdx % countChildrenFail === 0) {
        failList.push([]);
      }

      failList[failList.length - 1].push(failItem);
    }
  );

  useEffect(() => {
    if (stationSelected?.label && isDrawerDetails) {
      dispatch(closeDrawer());
    }
  }, [settingsGlobal.building]);

  useEffect(() => {
    const filteredDispatch: FaultPredictionPayload[] = (
      payload as FaultPredictionPayload[]
    ).filter((payload) => payload.label === stationSelected.label);
    if (
      filteredDispatch.length &&
      filteredDispatch[0].stop_fail_list.length !==
        stationSelected.stop_fail_list.length
    ) {
      dispatch(stationActive(filteredDispatch[0]));
    }
  });

  useEffect(() => {
    if (screen > 600) setCountChildrenRow(4);
    if (screen > 1050) setCountChildrenRow(5);
    if (screen > 1280) setCountChildrenRow(6);
    if (screen > 1300) setCountChildrenRow(7);
    if (screen > 1670) setCountChildrenRow(8);
    if (screen > 1920) setCountChildrenRow(10);

    if (screen <= 1669) setCountChildrenFail(2);
    if (screen <= 1140) setCountChildrenFail(1);
    if (screen > 1670) setCountChildrenFail(3);
  }, [screen]);

  return (
    <S.Container>
      {message && data[0].length > 0 ? (
        data.map((row, rowIdx) => (
          <S.StationsContent key={`${rowIdx}`}>
            <S.RowStations>{row.map((station) => station)}</S.RowStations>
            {idChildren[rowIdx].includes(stationSelected.label) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto', width: '100%' }}
                exit={{ height: 0 }}
                transition={{ damping: 100, duration: 0.2 }}
              >
                {isDrawerDetails && (
                  <S.DetailsDrawer>
                    <S.DetailsDrawerContent>
                      <S.DetailsStation>
                        <S.Title>
                          <h1>{stationSelected.label}</h1>
                          <span onClick={() => dispatch(closeDrawer())}>
                            &nbsp;
                          </span>
                        </S.Title>
                        <S.Status>
                          <h2>
                            circuito: <span>{stationSelected.circuit}</span>
                          </h2>
                          <Divider />
                          <S.Scroll>
                            {failList.map((row, rowIdx) => (
                              <S.FaultListRow key={rowIdx}>
                                {row.map(
                                  (fail: PredictedFaultItem, idx: number) => {
                                    return (
                                      <S.DetailsFaults
                                        key={`${fail.fail_name}_${idx}`}
                                      >
                                        <S.DetailsFaultListRow>
                                          <h3>
                                            Evento:{' '}
                                            <span>{fail.fail_name}</span>
                                          </h3>
                                          <h3>
                                            Equipamento:{' '}
                                            <span>{fail.equipment}</span>
                                          </h3>
                                        </S.DetailsFaultListRow>
                                        <AnalogSignalsTable
                                          rows={fail.analog_signals}
                                        />
                                      </S.DetailsFaults>
                                    );
                                  }
                                )}
                              </S.FaultListRow>
                            ))}
                          </S.Scroll>
                        </S.Status>
                      </S.DetailsStation>
                    </S.DetailsDrawerContent>
                  </S.DetailsDrawer>
                )}
              </motion.div>
            )}
          </S.StationsContent>
        ))
      ) : (
        <MessageError
          isVisible
          title="Error ao tentar buscar os dados"
          description="Linha sem registro de falhas"
          icon={<Error />}
        />
      )}
    </S.Container>
  );
};

export default DetailedView;
