import { FaultPredictionPayload } from 'components/StationItemFaults/types';
import { KeysOfPagesContainingStations } from 'types';
import { ModeView } from 'types';

/*=-=-=-=-=-= COMPONENT =-=-=-=-=-=*/
export type SimplifiedViewProps = {
  message: FaultPredictionPayload[];
  namespace: KeysOfPagesContainingStations;
  isDrawerDetails?: boolean;
};

export type TableSignalsProps = {
  rows: {
    name: string;
    standard_value: number;
    changed_value: number;
    percentage_changed: number;
  }[];
};

/*=-=-=-=-=-= STYLES =-=-=-=-=-=*/
export type ContainerProps = {
  modeViewType: ModeView;
};

export type LabelTypeProps = {
  isLabelType: boolean;
  modeViewType: ModeView;
};

export type TableRowProps = {
  percentage: number;
};
