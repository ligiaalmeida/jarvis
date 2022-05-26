import { CurrentFaultsPayload } from 'components/StationItemFaults/types';
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
};

export type LabelTypeProps = {
  isLabelType: boolean;
  modeViewType: ModeView;
};
