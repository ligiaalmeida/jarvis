import {
  CurrentFaultsPayload,
  FaultPredictionPayload,
} from 'components/StationItemFaults/types';
import React from 'react';
import { KeysOfPagesContainingStations } from 'types';

/*=-=-=-=-=-= COMPONENT =-=-=-=-=-=*/
export type SimplifiedViewProps = {
  message: CurrentFaultsPayload[] | FaultPredictionPayload[];
  namespace: KeysOfPagesContainingStations;
  isDrawerDetails?: boolean;
};

export type DetailedViewProps = {
  children: React.ReactNode | React.ReactNode[];
};

export type TabsData<T> = {
  label: {
    id: number;
    title: string;
  };
  componentChildren: T[];
};
