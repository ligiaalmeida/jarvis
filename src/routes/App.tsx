import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentFaultsActions } from 'store/ducks/currentFaults';

import routes from 'constants/routes';

import Navigation from 'components/Navigation';

import SignInPage from 'pages/SignInPage';
import PerformancePage from 'pages/PerformancePage';
import CurrentFaultsPage from 'pages/CurrentFautsPage';
import FaultPredictionPage from 'pages/FaultPredictionPage';
import CurrentStatusPage from 'pages/CurrentStatusPage';
import MixSuggestionPage from 'pages/MixSuggestionPage';
import PerformanceHistoryPage from 'pages/PerformanceHistoryPage';
import MonthlyReportPage from 'pages/MonthlyReportPage';
import ShiftsRegistrationPage from 'pages/ShiftsRegistationPage';

import { StateMapToPropsGlobal, RouterProps } from 'types';
import { CurrentStatusActions } from 'store/ducks/currentStatus';
import { SignInActions } from 'store/ducks/auth';

const authRoutes = [
  {
    id: 1,
    name: 'performance',
    route: {
      path: routes.PERFORMANCE,
      component: PerformancePage,
    },
  },
  {
    id: 2,
    name: 'fault_prediction',
    route: {
      path: routes.FAULT_PREDICTION,
      component: FaultPredictionPage,
    },
  },
  {
    id: 3,
    name: 'current_faults',
    route: {
      path: routes.CURRENT_FAULTS,
      component: CurrentFaultsPage,
    },
  },
  {
    id: 4,
    name: 'current_status',
    route: {
      path: routes.CURRENT_STATUS,
      component: CurrentStatusPage,
    },
  },
  {
    id: 5,
    name: 'mix_suggestion',
    route: {
      path: routes.MIX_SUGGESTION,
      component: MixSuggestionPage,
    },
  },
  {
    id: 6,
    name: 'performance_history',
    route: {
      path: routes.PERFORMANCE_HISTORY,
      component: PerformanceHistoryPage,
    },
  },
  {
    id: 7,
    name: 'monthly_report',
    route: {
      path: routes.MONTHLY_REPORT,
      component: MonthlyReportPage,
    },
  },
  {
    id: 8,
    name: 'shifts_registration',
    route: {
      path: routes.SHIFTS_REGISTRATION,
      component: ShiftsRegistrationPage,
    },
  },
];

export default function Routes() {
  const [userRoutes, setUserRoutes] = useState<typeof authRoutes>(null!);

  const settings = useSelector((state: Pick<StateMapToPropsGlobal, 'global'>) => state.global);
  const settingsCurrentsFaults = useSelector((state: StateMapToPropsGlobal) => state.currentFaultsPage.stationActive);
  const settingsCurrentsStatus = useSelector((state: StateMapToPropsGlobal) => state.currentStatusPage);
  const router = useSelector((state: RouterProps) => state.router);
  const signInPage = useSelector((state: Pick<StateMapToPropsGlobal, 'polices'>) => state.polices);

  const history = useHistory();

  const { closeDrawer } = CurrentFaultsActions;
  const { stationActive } = CurrentStatusActions;
  const { polices, isLogin } = SignInActions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (signInPage.isConnected && signInPage.config.polices[0]?.label.length) {
      const authMenuItems = signInPage.config.polices.filter((police) => police.nome === settings.building)[0];
      const isRedirect = authMenuItems.menu_item.filter((item) => `/${item.name}` === router.location.pathname);
      const routerDom = authMenuItems.menu_item.map((item) => {
        return authRoutes.filter((authRoute) => authRoute.name === item.name)[0];
      });

      setUserRoutes(routerDom);

      if (!isRedirect.length) history.push(`/${routerDom[0].name}`);
    } else {
      history.push(`/`);
    }
  }, [settings.building, signInPage.isConnected]);

  useEffect(() => {
    if (router.location.pathname !== routes.CURRENT_FAULTS && settingsCurrentsFaults.label) {
      dispatch(closeDrawer());
    }

    if (router.location.pathname !== routes.CURRENT_STATUS && settingsCurrentsStatus.station.label) {
      dispatch(
        stationActive({
          position_id: '',
          num_prod: 0,
          baumuster: '',
          label: '',
          color: '',
          active_fail_list: [],
        })
      );
    }
  });

  if (!signInPage.isConnected && signInPage.config.polices[0]?.label.length) {
    dispatch(isLogin(false));
    dispatch(
      polices({
        label: '',
        nome: '',
        menu_item: [
          {
            label: '',
            name: '',
          },
        ],
      })
    );
  }

  return (
    <Switch>
      <>
        {router.location.pathname !== '/' && signInPage.config.polices[0]?.label.length && <Navigation />}
        <Route exact path={routes.SIGN_IN} component={SignInPage} />
        {signInPage.isConnected &&
          userRoutes &&
          userRoutes.map(({ id, route }) => <Route key={id} path={route.path} component={route.component} />)}
      </>
    </Switch>
  );
}
