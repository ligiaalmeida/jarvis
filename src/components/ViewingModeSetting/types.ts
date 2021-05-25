import { ContainerHeaderProps } from 'components/Navigation/types';
import { LabelTypeProps } from 'pages/CurrentFautsPage/types';
import { KeyOfPages, Pathname } from 'types';

/*=-=-=-=-=-= COMPONENT =-=-=-=-=-=*/
export type ViewingModeSettingProps<Event> = {
  pageName: KeyOfPages;
  toggleNavigation: boolean;
  handleChange: (event: Event) => void;
};

/*=-=-=-=-=-= STYLES =-=-=-=-=-=*/
export type SettingsPageProps = Pick<ContainerHeaderProps, 'toggleNavigation'> &
  LabelTypeProps & { pathname: Pathname };
