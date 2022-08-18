import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { History } from 'history';

import { GlobalActions } from 'store/ducks/global';
import { PerformanceHistoryActions } from 'store/ducks/performanceHistory';
import { MonthlyReportActions } from 'store/ducks/monthlyReport';
import { SignInActions } from 'store/ducks/auth';

import Brand from 'components/Brand';
import Logout from 'components/Icons/Logout';
import Switch from 'components/FormElements/Switch';
import { SettingsGear as SettingsIcon } from 'components/Icons';

import routes from 'constants/routes';

import { useWindowWidth, useClickOutside } from 'hooks';
import { theme } from 'styles/theme';

import navItems from 'constants/navigation';

import {
  ModeView,
  RangeHours,
  StateMapToPropsGlobal,
  StateMapToRouterProps,
} from 'types';
import * as Types from 'types';
import * as S from './styles';

const Navigation = () => {
  const [isHoveredSettingsSecondary, setIsHoveredSettingsSecondary] =
    useState(false);
  const [isHoveredSettingsPrimary, setIsHoveredSettingPrimary] =
    useState(false);
  const [modeView, setModeView] = useState<ModeView | string>('');
  const [isNavMobile, setIsNavMobile] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleFullscreen, setToggleFullscreen] = useState<boolean>(false);

  const refDrawer = useRef<HTMLDivElement>(null!);

  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const history = useSelector(
    (state: StateMapToRouterProps<History>) => state.router
  );
  const getSettingsCurrentFaultsPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'currentFaultsPage'>) =>
      state.currentFaultsPage
  );
  const getSettingsFaultPredictionPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'faultPredictionPage'>) =>
      state.faultPredictionPage
  );
  const getInputPerformanceHistoryPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'performanceHistoryPage'>) =>
      state.performanceHistoryPage
  );
  const getInputMonthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) =>
      state.monthlyReportPage
  );

  const signInPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'polices'>) => state.polices
  );

  const authMenuItems = signInPage.config.polices.filter(
    (police) => police.nome === settings.building
  )[0];
  const menuItems = authMenuItems.menu_item.map((item) => {
    return navItems.filter(
      (menuItem) => menuItem.link.split('/')[1] === item.name
    )[0];
  });

  const { toggleNavigation, toggleHeader, setHeightNavigation } = GlobalActions;
  const { polices, isLogin } = SignInActions;
  const dispatch = useDispatch();
  const date = new Date();
  const width = useWindowWidth();

  const setHeight = () => {
    if (settings.toggleNavigation && !settings.toggleHeader) {
      dispatch(setHeightNavigation(theme.layout.navigation.height.off));
    } else {
      if (!settings.toggleNavigation) {
        dispatch(setHeightNavigation(theme.layout.navigation.height.on));
      } else {
        dispatch(setHeightNavigation(0));
      }
    }
  };

  useClickOutside(refDrawer, () => {
    if (toggleNav) setToggleNav((prevState) => !prevState);
  });

  useEffect(() => {
    if ((history.location.pathname as Types.Pathname) === '/current_faults')
      setModeView(getSettingsCurrentFaultsPage.modeView);

    if ((history.location.pathname as Types.Pathname) === '/fault_prediction')
      setModeView(getSettingsFaultPredictionPage.modeView);
  }, [
    history.location.pathname,
    getSettingsCurrentFaultsPage.modeView,
    getSettingsFaultPredictionPage.modeView,
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1199px)');

    setIsNavMobile(mediaQuery.matches);
  }, [width]);

  useEffect(() => {
    if (toggleNav) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'initial';
  }, [toggleNav]);

  const handleFullscreen = (isFullscreen: boolean) => {
    if (isFullscreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => setToggleFullscreen(true))
        .catch((err) => console.log(`${err.message} (${err.name})`));
    }
    if (!isFullscreen) {
      if (document.fullscreenElement !== null) {
        document
          .exitFullscreen()
          .then(() => setToggleFullscreen(false))
          .catch((err) => console.error(`${err.name} ${err.message}`));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('fullscreenchange', () => {
      setToggleFullscreen(document.fullscreenElement ? true : false);
    });
  }, []);

  return (
    <S.ContainerHeader
      height={settings.heightNavigation}
      toggleNavigation={!settings.toggleNavigation}
      id="navigation"
    >
      {!settings.toggleNavigation && (
        <S.SettingsSecondary
          page={history.location.pathname as Types.Pathname}
          modeView={modeView}
        >
          <div
            onFocus={() => void 0}
            onMouseOver={() => {
              setIsHoveredSettingsSecondary(true);
              setIsHoveredSettingPrimary(false);
            }}
            onMouseLeave={() => setIsHoveredSettingsSecondary(false)}
          >
            <SettingsIcon
              fill={
                !settings.toggleNavigation &&
                history.location.pathname === routes.CURRENT_FAULTS &&
                getSettingsCurrentFaultsPage.modeView === 'detailed'
                  ? '#fff'
                  : ''
              }
            />
            <AnimatePresence>
              {isHoveredSettingsSecondary && (
                <motion.div
                  style={{
                    top: '-45px',
                    right: 0,
                    position: 'absolute',
                    width: 'max-content',
                  }}
                  initial={{ y: '80px', opacity: 0 }}
                  animate={{ y: '45px', opacity: 1 }}
                  exit={{ y: '80px', opacity: 0 }}
                  transition={{ damping: 300 }}
                >
                  <S.Settings>
                    <Switch
                      labelDirection="right"
                      label="Ocultar navegação"
                      fontSize="14px"
                      padding="0"
                      scaleSwitch={0.8}
                      enabled={!settings.toggleNavigation}
                      onChange={(isNavigation) => {
                        dispatch(toggleNavigation(!isNavigation));
                        dispatch(toggleHeader(!isNavigation));
                        setHeight();
                      }}
                    />
                  </S.Settings>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </S.SettingsSecondary>
      )}

      <AnimatePresence>
        {settings.toggleNavigation && settings.toggleHeader && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ damping: 300 }}
          >
            <S.Header>
              <S.Brand>
                <Brand />
              </S.Brand>
            </S.Header>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settings.toggleNavigation && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ damping: 300 }}
          >
            <S.Nav>
              {isNavMobile && (
                <>
                  <S.HamburgerMenu
                    onClick={() => {
                      setToggleNav((prevState) => !prevState);
                    }}
                  >
                    <div className="navigation__hamburger-menu-content">
                      <span className="navigation__hamburger-line--top" />
                      <span className="navigation__hamburger-line--middle" />
                      <span className="navigation__hamburger-line--bottom" />
                    </div>
                  </S.HamburgerMenu>
                  {toggleNav && (
                    <S.NavigationMobile
                      countItems={
                        [...menuItems, ...menuItems, ...menuItems].length
                      }
                      className="navigation__mobile"
                    >
                      <motion.div
                        style={{ height: '100%' }}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ damping: 300 }}
                      >
                        <div ref={refDrawer} className="navigation__container">
                          <header>
                            <Brand />
                          </header>
                          <section>
                            <ul>
                              {menuItems &&
                                menuItems.map((item) => (
                                  <S.NavItem
                                    key={item.id}
                                    onClick={() => {
                                      setToggleNav((prevState) => !prevState);
                                    }}
                                  >
                                    <NavLink
                                      to={item.link}
                                      activeClassName="active"
                                    >
                                      {item.name.pt_br}
                                    </NavLink>
                                  </S.NavItem>
                                ))}
                            </ul>
                          </section>
                        </div>
                      </motion.div>
                    </S.NavigationMobile>
                  )}
                </>
              )}
              {!isNavMobile && (
                <ul className="navigation__desk">
                  {menuItems &&
                    menuItems.map((item) => (
                      <S.NavItem key={item.id}>
                        <NavLink to={item.link} activeClassName="active">
                          {item.name.pt_br}
                        </NavLink>
                      </S.NavItem>
                    ))}
                </ul>
              )}
              <ul>
                <S.NavItem>
                  <S.FullScreen
                    onMouseOver={() => {
                      setIsHoveredSettingPrimary(true);
                      setIsHoveredSettingsSecondary(false);
                    }}
                    onMouseLeave={() => setIsHoveredSettingPrimary(false)}
                  >
                    <span>Configurações</span>
                    <AnimatePresence>
                      {isHoveredSettingsPrimary && (
                        <motion.div
                          style={{
                            width: isNavMobile ? '120%' : '100%',
                            x: isNavMobile ? -24 : 0,
                            position: 'absolute',
                            zIndex: -1,
                          }}
                          initial={{ y: '-100%' }}
                          animate={{ y: '48px' }}
                          exit={{ y: '-100%' }}
                          transition={{ damping: 300 }}
                        >
                          <S.Settings>
                            <Switch
                              className="dropdown"
                              labelDirection="right"
                              label="Full Screen"
                              fontSize="14px"
                              padding="0"
                              scaleSwitch={0.8}
                              enabled={toggleFullscreen}
                              onChange={(isFullscreen) => {
                                handleFullscreen(isFullscreen);
                              }}
                            />
                            <Switch
                              className="dropdown"
                              labelDirection="right"
                              label="Ocultar header"
                              fontSize="14px"
                              padding="0"
                              scaleSwitch={0.8}
                              enabled={!settings.toggleHeader}
                              onChange={(isHeader) => {
                                dispatch(toggleHeader(!isHeader));

                                settings.toggleHeader
                                  ? dispatch(
                                      setHeightNavigation(
                                        theme.layout.navigation.height.off
                                      )
                                    )
                                  : dispatch(
                                      setHeightNavigation(
                                        theme.layout.navigation.height.on
                                      )
                                    );
                              }}
                            />

                            <Switch
                              className="dropdown"
                              labelDirection="right"
                              label="Ocultar navegação"
                              fontSize="14px"
                              padding="0"
                              scaleSwitch={0.8}
                              enabled={!settings.toggleNavigation}
                              onChange={(isNavigation) => {
                                dispatch(toggleNavigation(!isNavigation));
                                setHeight();
                              }}
                            />
                          </S.Settings>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </S.FullScreen>
                </S.NavItem>
                <S.NavItem>
                  <NavLink
                    to={routes.SIGN_IN}
                    onClick={() => {
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
                    }}
                    activeClassName="signin"
                  >
                    <span>Sair</span>
                  </NavLink>
                  <Logout width="22px" height="23px" fill="red" />
                </S.NavItem>
              </ul>
            </S.Nav>
          </motion.div>
        )}
      </AnimatePresence>
    </S.ContainerHeader>
  );
};

export default Navigation;
