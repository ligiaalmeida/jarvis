import {
  CurrentFaultsPayload,
  FaultPredictionPayload,
} from 'components/StationItemFaults/types';
import { KeysOfPagesContainingStations } from 'types';

/*=-=-=-=-=-= COMPONENT =-=-=-=-=-=*/
export type SimplifiedViewProps = {
  message: {
    current_faults?: CurrentFaultsPayload[];
    fault_prediction?: FaultPredictionPayload[];
  };
  namespace: KeysOfPagesContainingStations;
  isDrawerDetails?: boolean;
};

export type TabsData<T> = {
  label: {
    id: number;
    title: string;
  };
  componentChildren: T[];
};
