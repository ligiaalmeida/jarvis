import React, { useState } from 'react';

import { CurrentFaultsActions } from 'store/ducks/currentFaults';
import { FaultPredictionActions } from 'store/ducks/faultPrediction';

import CurrentFaultStation from 'components/StationItemFaults/CurrentFaultStation';
import FaultPredictionStation from 'components/StationItemFaults/FaultPredictionStation';
import NavTabs from 'components/NavTabs';

import {
  CurrentFaultItem,
  CurrentFaultsPayload,
  FaultPredictionPayload,
  PredictedFaultItem,
  StationItemCurrentFaultsProps,
} from 'components/StationItemFaults/types';
import { KeysOfPagesContainingStations } from 'types';
import * as Types from '../types';

const SimplifiedView = ({
  message,
  isDrawerDetails = false,
  namespace,
}: Types.SimplifiedViewProps) => {
  const data: Types.TabsData<React.ReactElement>[] = [];

  if (namespace === 'currentFaultsPage') {
    const stationList: CurrentFaultsPayload[] = message
      ? (message as CurrentFaultsPayload[])?.filter(
          (station: { fail_list: CurrentFaultItem[] }) =>
            station.fail_list.length > 0
        )
      : [];
    stationList.map((station, idx) => {
      if (idx % 24 === 0) {
        data.push({
          label: { id: idx, title: station.label },
          componentChildren: [],
        });
      }

      data[data.length - 1].componentChildren.push(
        <CurrentFaultStation
          data={station}
          key={station.label}
          id={station.label}
          namespace={namespace}
          isOnClick={isDrawerDetails}
          typeView="simplified"
        />
      );
      data.map((row, idxRow) => (row.label.id = idxRow));
      return data;
    });
  }

  if (namespace === 'faultPredictionPage') {
    const stationList: FaultPredictionPayload[] = message
      ? (message as FaultPredictionPayload[])?.filter(
          (station: { stop_fail_list: PredictedFaultItem[] }) =>
            station.stop_fail_list.length > 0
        )
      : [];
    stationList.map((station, idx) => {
      if (idx % 24 === 0) {
        data.push({
          label: { id: idx, title: station.label },
          componentChildren: [],
        });
      }

      data[data.length - 1].componentChildren.push(
        <FaultPredictionStation
          data={station}
          key={station.label}
          id={station.label}
          namespace={namespace}
          isOnClick={isDrawerDetails}
          typeView="simplified"
        />
      );
      data.map((row, idxRow) => (row.label.id = idxRow));
      return data;
    });
  }

  data.map((item) => {
    item.label.title += ` ao ${
      (
        item.componentChildren[item.componentChildren.length - 1]
          .props as StationItemCurrentFaultsProps
      ).data.label
    }`;
  });

  const getActions = (namespace: KeysOfPagesContainingStations) => {
    switch (namespace) {
      case 'currentFaultsPage':
        return {
          actionAutomaticMode: CurrentFaultsActions.toggleAutomaticMode,
          actionTimer: CurrentFaultsActions.timer,
        };
      default:
        return {
          actionAutomaticMode: FaultPredictionActions.toggleAutomaticMode,
          actionTimer: FaultPredictionActions.timer,
        };
    }
  };

  return (
    <NavTabs
      {...getActions(namespace)}
      namespace={namespace}
      isSettings
      isHeightFull
      minHeight={8}
      padding="2rem 2.5rem"
      data={data}
    />
  );
};

export default SimplifiedView;
