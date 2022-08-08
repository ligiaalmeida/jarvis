import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { CurrentFaultsActions } from 'store/ducks/currentFaults';
import { useWindowWidth, useClickOutside } from 'hooks';
import { timeFormat, getTime, getDisplayBuilding } from 'utils/js';

import StationItemFaults from 'components/StationItemFaults';
import ArrowDown from 'components/Icons/ArrowDown';
import Tooltip from 'components/Tooltip';
import MessageError from 'components/Messages/Error';

import {
  CurrentFaultsPayload,
  FaultPredictionPayload,
} from 'components/StationItemFaults/types';
import { StateMapToPropsGlobal } from 'types';
import * as Types from '../types';

import texts from '../texts';
import * as S from './styles';
import Error from '../../Icons/Error';

const variant = {
  closed: {
    opacity: 0,
    height: 0,
    y: '20px',
  },
  open: {
    opacity: 1,
    y: '-6px',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
  finished: {
    opacity: 0,
    height: 0,
    y: '20px',
    x: '10px',
    transition: {
      duration: 0.4,
    },
  },
};

const DetailedView = ({
  message,
  namespace,
  isDrawerDetails = true,
}: Types.SimplifiedViewProps) => {
  const [countChildrenRow, setCountChildrenRow] = useState(4);
  const [countChildrenFail, setCountChildrenFail] = useState(3);
  const [failActive, setFailActive] = useState('');

  const settingsGlobal = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const stationSelected = useSelector(
    (state: StateMapToPropsGlobal) => state[namespace].stationActive
  );
  let payload: CurrentFaultsPayload[] | FaultPredictionPayload[] | undefined;
  const data: Array<React.ReactElement>[] = [[]];
  const idChildren: Array<string>[] = [[]];
  const failList: Array<typeof stationSelected.fail_list> = [[]];

  switch (namespace) {
    case 'faultPredictionPage':
      payload = message ? message?.fault_prediction : [];
      break;
    default:
      payload = message
        ? message?.current_faults?.filter(
            (station) => station.fail_list.length > 0
          )
        : [];
      break;
  }

  const screen = useWindowWidth();
  const refEventList = useRef<HTMLDivElement>(null!);

  useClickOutside(refEventList, () => {
    if (failActive) setFailActive('');
  });

  const { closeDrawer, stationActive } = CurrentFaultsActions;
  const dispatch = useDispatch();

  if (namespace === 'currentFaultsPage') {
    (payload as CurrentFaultsPayload[])?.map((station, idx) => {
      if (idx > 0 && idx % countChildrenRow === 0) {
        data.push([]);
        idChildren.push([]);
      }

      data[data.length - 1].push(
        <StationItemFaults
          key={station.label}
          id={`${station.label}`}
          data={station}
          namespace={namespace}
          isOnClick={isDrawerDetails}
        />
      );

      idChildren[data.length - 1].push(station.label);
    });

    stationSelected.fail_list.map((failItem, failIdx) => {
      if (failIdx > 0 && failIdx % countChildrenFail === 0) {
        failList.push([]);
      }

      failList[failList.length - 1].push(failItem);
    });
  }

  if (namespace === 'faultPredictionPage') {
    (payload as FaultPredictionPayload[])?.map((station, idx) => {
      if (idx > 0 && idx % countChildrenRow === 0) {
        data.push([]);
        idChildren.push([]);
      }

      data[data.length - 1].push(
        <StationItemFaults
          key={station.label}
          id={`${station.label}`}
          namespace={namespace}
          data={station}
          isOnClick={isDrawerDetails}
        />
      );

      idChildren[data.length - 1].push(station.label);
    });
  }

  useEffect(() => {
    if (
      stationSelected?.label &&
      isDrawerDetails &&
      namespace === 'currentFaultsPage'
    )
      dispatch(closeDrawer());
  }, [settingsGlobal.building]);

  useEffect(() => {
    let filteredDispatch: CurrentFaultsPayload[];

    if (namespace === 'currentFaultsPage') {
      filteredDispatch = (payload as CurrentFaultsPayload[]).filter(
        (payload) => payload.label === stationSelected.label
      );
      if (
        filteredDispatch.length &&
        filteredDispatch[0].fail_list.length !==
          stationSelected.fail_list.length
      ) {
        dispatch(stationActive(filteredDispatch[0]));
      }
    }
  });

  useEffect(() => {
    if (screen > 600) setCountChildrenRow(4);
    if (screen > 1050) setCountChildrenRow(5);
    if (screen > 1280) setCountChildrenRow(6);
    if (screen > 1300) setCountChildrenRow(7);
    if (screen > 1670) setCountChildrenRow(8);
    if (screen > 1920) setCountChildrenRow(10);

    if (screen <= 1669) setCountChildrenFail(3);
    if (screen <= 1140) setCountChildrenFail(1);
    if (screen > 1670) setCountChildrenFail(3);
  }, [screen]);

  return (
    <AnimatePresence>
      <motion.div
        variants={variant}
        initial="closed"
        animate="open"
        exit="finished"
      >
        <S.Container>
          {namespace === 'currentFaultsPage' && (
            <>
              {message && data[0].length > 0 ? (
                data.map((row, rowIdx) => (
                  <S.StationsContent key={`${rowIdx}`}>
                    <S.RowStations>
                      {row.map((station) => station)}
                    </S.RowStations>
                    {idChildren[rowIdx].includes(stationSelected.label) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ damping: 100, duration: 0.2 }}
                      >
                        {isDrawerDetails && (
                          <S.DetailsDrawer>
                            <S.DetailsDrawerContent>
                              <S.DetailsStation>
                                <h1>{stationSelected.label}</h1>
                                {failList.map((row, rowIdx) => (
                                  <S.FaultListRow key={rowIdx}>
                                    {row
                                      .sort((failA, failB) => {
                                        if (failA.gravity < failB.gravity)
                                          return 1;
                                        if (failA.gravity > failB.gravity)
                                          return -1;
                                        return 0;
                                      })
                                      .map((fail, idx) => (
                                        <S.FailItem key={`${fail.name}_${idx}`}>
                                          <S.FailName color={fail.color}>
                                            <span>{fail.label}</span>
                                            <span
                                              onClick={() => {
                                                setFailActive(fail.name);
                                              }}
                                            >
                                              <ArrowDown fill="#fff" />
                                            </span>
                                            {fail.name === failActive && (
                                              <motion.div
                                                style={{
                                                  position: 'absolute',
                                                  zIndex: 2,
                                                }}
                                                variants={variant}
                                                initial="closed"
                                                animate="open"
                                                exit="finished"
                                              >
                                                <S.FailEvents
                                                  ref={refEventList}
                                                >
                                                  <p>{fail.label}</p>
                                                  <S.EventList>
                                                    {fail.event_list.map(
                                                      (fail, failIdx) => (
                                                        <S.EventItem
                                                          key={failIdx}
                                                        >
                                                          <div>
                                                            <span>
                                                              {failIdx + 1}
                                                            </span>
                                                          </div>
                                                          <div>
                                                            <span>
                                                              Início:{' '}
                                                            </span>
                                                            <span>
                                                              {getTime(
                                                                fail.start_timestamp
                                                              )}
                                                            </span>
                                                          </div>
                                                          <div>
                                                            <span>
                                                              Duração:{' '}
                                                            </span>
                                                            <span>
                                                              {timeFormat({
                                                                displayFormat:
                                                                  'HH:MM:SS',
                                                                separatorHour:
                                                                  'h ',
                                                                separatorMinute:
                                                                  "'",
                                                                separatorSeconds:
                                                                  '"',
                                                                time: Number(
                                                                  fail.duration
                                                                ),
                                                              })}
                                                            </span>
                                                          </div>
                                                        </S.EventItem>
                                                      )
                                                    )}
                                                  </S.EventList>
                                                </S.FailEvents>
                                              </motion.div>
                                            )}
                                          </S.FailName>
                                          <div className="fail-item__quantity">
                                            <div className="fail-item__quantity-content">
                                              <span>{fail.quantity}</span>
                                            </div>
                                            <Tooltip
                                              description={
                                                <span>
                                                  Quantidade acumulada de
                                                  eventos de falha do tipo:{' '}
                                                  <strong>{fail.label}</strong>
                                                </span>
                                              }
                                              xPosition="-26px"
                                              yPosition="8px"
                                            />
                                          </div>
                                          <span>
                                            {timeFormat({
                                              displayFormat: 'HH:MM:SS',
                                              separatorHour: 'h ',
                                              separatorMinute: "' ",
                                              separatorSeconds: '"',
                                              time: Number(fail.duration),
                                            })}
                                          </span>
                                        </S.FailItem>
                                      ))}
                                  </S.FaultListRow>
                                ))}
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
            </>
          )}

          {namespace === 'faultPredictionPage' && (
            <>
              {message && data[0].length > 0 ? (
                data.map((row, rowIdx) => (
                  <S.StationsContent key={`${rowIdx}`}>
                    <S.RowStations>
                      {row.map((station) => station)}
                    </S.RowStations>
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
            </>
          )}
        </S.Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default DetailedView;
