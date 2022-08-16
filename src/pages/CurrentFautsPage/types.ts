import { CurrentFaultsPayload } from 'components/StationItemFaults/types';
import React from 'react';
import { KeysOfPagesContainingStations } from 'types';
import { ModeView } from 'types';

/*=-=-=-=-=-= COMPONENT =-=-=-=-=-=*/
export type SimplifiedViewProps = {
  message: CurrentFaultsPayload[];
  namespace: KeysOfPagesContainingStations;
  isDrawerDetails?: boolean;
};

/*=-=-=-=-=-= STYLES =-=-=-=-=-=*/
export type ContainerProps = {
  modeViewType: ModeView;
  children?:
    | React.ReactNode
    | React.ReactNode[]
    | React.ReactElement
    | React.ReactElement[];
};

export type LabelTypeProps = {
  isLabelType: boolean;
  modeViewType: ModeView;
};
