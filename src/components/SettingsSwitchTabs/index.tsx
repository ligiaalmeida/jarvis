import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@material-ui/core/Slider';
import { AnimatePresence, motion } from 'framer-motion';

import { SettingsSwitchTabsProps, StateMapToPropsGlobal, PageStorageDefault, RangeAutomaticTimer } from 'types';

import Switch from 'components/FormElements/Switch';
import { SettingsDots } from 'components/Icons/SettingsDots';

import { useClickOutside, useSetTimeout } from 'hooks';

import { presenceBottomToTop } from 'animation/variants';

import * as S from './styles';

const marks = [
  { value: 30, label: '30s' },
  { value: 60, label: '60s' },
  { value: 90, label: '90s' },
  { value: 120, label: '120s' },
];

const SettingsSwitchTabs: React.FC<SettingsSwitchTabsProps> = ({
  setState,
  countOfTabs,
  configSlider,
  actionTimer,
  actionAutomaticMode,
  namespace = 'currentFaultsPage',
}) => {
  const settingsPage = useSelector((state: StateMapToPropsGlobal) => state[namespace]);
  const [isSwitchTabViewer, setIsSwitchTabViewer] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isToggled, setIsToggled] = useState(false);
  const refSettingsButton = useRef<HTMLDivElement>(null!);
  const refSettingsDrawer = useRef<HTMLDivElement>(null!);

  const dispatch = useDispatch();

  useClickOutside(refSettingsButton, () => {
    if (isToggled) setIsToggled((prevState) => !prevState);
  });

  useSetTimeout({
    condition: isSwitchTabViewer,
    callback: () => setState((prevState) => (prevState === countOfTabs - 1 ? 0 : prevState + 1)),
    timer: timer * 1000,
  });

  useEffect(() => {
    if (settingsPage) {
      setIsSwitchTabViewer((settingsPage as PageStorageDefault).timer?.automaticMode);
      setTimer((settingsPage as PageStorageDefault).timer?.timer);
    }
  }, [settingsPage, timer]);

  return (
    <S.Settings
      ref={refSettingsButton}
      onClick={(e) => {
        if (refSettingsButton.current === e.target) {
          setIsToggled((prevState) => !prevState);
        }
      }}
    >
      <S.IconSettings>
        <SettingsDots />
      </S.IconSettings>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            style={{
              position: 'relative',
              zIndex: 2,
            }}
            variants={presenceBottomToTop}
            initial="closed"
            animate="open"
            exit="finished"
          >
            <S.SettingsDrawer ref={refSettingsDrawer}>
              <Switch
                label="Modo Automático"
                labelDirection="left"
                fontSize="1.4rem"
                scaleSwitch={0.8}
                enabled={(settingsPage as PageStorageDefault).timer.automaticMode}
                onChange={(value: boolean) => {
                  if (actionAutomaticMode) dispatch(actionAutomaticMode(value));
                }}
              />
              <S.TimerContainer>
                <S.Label>
                  <span>Temporizador</span>
                </S.Label>
                <S.SliderContent>
                  <Slider
                    disabled={!settingsPage.timer.automaticMode}
                    marks={marks}
                    step={configSlider?.step || 30}
                    min={configSlider?.min || 30}
                    max={configSlider?.max || 120}
                    aria-labelledby="timer-slider"
                    valueLabelDisplay="off"
                    value={(settingsPage as PageStorageDefault).timer.timer}
                    onChangeCommitted={(_, value) => {
                      if (actionTimer) dispatch(actionTimer(value as RangeAutomaticTimer));
                    }}
                  />
                </S.SliderContent>
              </S.TimerContainer>
            </S.SettingsDrawer>
          </motion.div>
        )}
      </AnimatePresence>
    </S.Settings>
  );
};

export default SettingsSwitchTabs;
