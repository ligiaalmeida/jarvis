import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { subMonths, addMonths } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import {
  MenuItem as MuiMenuItem,
  FormControlLabel as MuiFormControlLabel,
  Select as MuiSelect,
} from '@material-ui/core';

import routes from 'constants/routes';
import { PerformanceHistoryActions } from 'store/ducks/performanceHistory';
import { MonthlyReportActions } from 'store/ducks/monthlyReport';
import { GlobalActions } from 'store/ducks/global';
import { range } from 'utils/js';

import texts from '../../Navigation/texts';

import { StateMapToPropsGlobal, Buildings, RangeHours } from 'types';
import * as Types from './types';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './styles';

registerLocale('pt-BR', ptBr);
setDefaultLocale('pt-BR');

const InputList: React.FC<Types.InputListProps> = ({
  children,
  padding,
  customCSSInputList,
  customCSSHeader,
  pathname,
  invertedElement,
}) => {
  const settings = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'global'>) => state.global
  );
  const polices = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'polices'>) => state.polices
  );
  const getInputPerformanceHistoryPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'performanceHistoryPage'>) =>
      state.performanceHistoryPage
  );
  const getInputMonthlyReportPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'monthlyReportPage'>) =>
      state.monthlyReportPage
  );
  const getCurrentFaultPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'currentFaultsPage'>) =>
      state.currentFaultsPage
  );
  const getFaultPredictionPage = useSelector(
    (state: Pick<StateMapToPropsGlobal, 'faultPredictionPage'>) =>
      state.faultPredictionPage
  );

  const { setBuilding } = GlobalActions;
  const dispatch = useDispatch();

  const hours = range(0, 23);
  const date = new Date();
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return (
    <S.Header
      invertedElement={invertedElement}
      customCSSHeader={customCSSHeader}
      customCSSInputList={customCSSInputList}
      padding={padding}
    >
      <S.InputList
        className="input-list"
        toggleNavigation={settings.toggleNavigation}
        page={pathname}
        modeView={
          pathname === '/current_faults'
            ? getCurrentFaultPage.modeView
            : getFaultPredictionPage.modeView
        }
      >
        {polices.config.polices.length > 1 && (
          <MuiFormControlLabel
            htmlFor="select-building"
            classes={{
              root: 'input-list__label-wrapper input-list__label-wrapper--building',
              label: 'input-list__label-content',
            }}
            label={texts.inputList.building.pt_br}
            labelPlacement="start"
            control={
              <MuiSelect
                id="select-building"
                className="input-list__Mui-select-building"
                defaultValue={settings.building}
                value={settings.building ? settings.building : ''}
                onChange={(e) => {
                  dispatch(setBuilding(e.target.value as Buildings));
                }}
                onOpen={() => {
                  document
                    .querySelector('#root')
                    ?.classList.add('current-faults__root--no-padding');
                }}
                onClose={() => {
                  document
                    .querySelector('#root')
                    ?.classList.remove('current-faults__root--no-padding');
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                }}
              >
                {polices.config.polices.map((item) => (
                  <MuiMenuItem key={item.nome} value={item.nome}>
                    {item.label.substring(5)}
                  </MuiMenuItem>
                ))}
              </MuiSelect>
            }
          />
        )}

        <AnimatePresence>
          {pathname === routes.PERFORMANCE_HISTORY && (
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
              initial={{ x: '150%' }}
              animate={{ x: 0 }}
              exit={{ x: '150%' }}
              transition={{ damping: 300, duration: 0.4 }}
            >
              <div className="input-list__input-item input-list__performance-history">
                <S.Calendar pathname={pathname}>
                  <label
                    htmlFor="calendar"
                    className="input-list__label-content"
                  >
                    Data
                  </label>
                  <React.Fragment>
                    <DatePicker
                      id="calendar"
                      name="date"
                      dateFormat="dd/MM/yyyy"
                      maxDate={addMonths(new Date(), 0)}
                      minDate={subMonths(new Date(), 8)}
                      className="input-list__input-item--calendar input-list__input-item--datepicker"
                      selected={
                        !getInputPerformanceHistoryPage.params?.date
                          ? new Date()
                          : new Date(
                              +getInputPerformanceHistoryPage.params.date.split(
                                '-'
                              )[0],
                              +getInputPerformanceHistoryPage.params.date.split(
                                '-'
                              )[1] - 1,
                              +getInputPerformanceHistoryPage.params.date.split(
                                '-'
                              )[2]
                            )
                      }
                      onChange={(date: Date) => {
                        dispatch(
                          PerformanceHistoryActions.setDate(
                            `${date.getFullYear()}-${
                              date.getMonth() + 1
                            }-${date.getDate()}`
                          )
                        );
                      }}
                    />
                  </React.Fragment>
                </S.Calendar>
                <S.Hour>
                  <MuiFormControlLabel
                    htmlFor="select-hour"
                    label={texts.inputList.hour.pt_br}
                    classes={{
                      root: 'input-list__label-wrapper input-list__label-wrapper--hour',
                      label: 'input-list__label-content',
                    }}
                    className="input-list__Mui-select-hour"
                    labelPlacement="start"
                    control={
                      <MuiSelect
                        id="select-hour"
                        className="input-list__hour"
                        defaultValue={String(new Date().getHours() - 2)}
                        value={
                          getInputPerformanceHistoryPage?.params?.hour
                            ? getInputPerformanceHistoryPage?.params?.hour
                            : 0
                        }
                        onChange={(e) => {
                          const newValue = Number(e.target.value) as RangeHours;
                          if (getInputPerformanceHistoryPage.params.date) {
                            dispatch(
                              PerformanceHistoryActions.setHour(newValue)
                            );
                          }
                        }}
                        onOpen={() => {
                          document
                            .querySelector('#root')
                            ?.classList.add('current-faults__root--no-padding');
                        }}
                        onClose={() => {
                          document
                            .querySelector('#root')
                            ?.classList.remove(
                              'current-faults__root--no-padding'
                            );
                        }}
                        MenuProps={{
                          classes: {
                            list: 'input-list__Mui-select-hour__list',
                          },
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        {getInputPerformanceHistoryPage.params &&
                        getInputPerformanceHistoryPage.params.date === now
                          ? hours.map((hour) => (
                              <MuiMenuItem key={hour} value={hour}>
                                {hour}
                              </MuiMenuItem>
                            ))
                          : hours.map((hour) => (
                              <MuiMenuItem key={hour} value={hour}>
                                {hour}
                              </MuiMenuItem>
                            ))}
                      </MuiSelect>
                    }
                  />
                </S.Hour>
              </div>
            </motion.div>
          )}

          {pathname === routes.MONTHLY_REPORT && (
            <motion.div
              style={{ display: 'flex' }}
              initial={{ x: '150%' }}
              animate={{ x: 0 }}
              exit={{ x: '150%' }}
              transition={{ damping: 300, duration: 0.4 }}
            >
              <div className="input-list__input-item input-list__monthly-report">
                <S.Calendar pathname={pathname} route>
                  <label
                    htmlFor="calendar"
                    className="input-list__label-content"
                  >
                    Data
                  </label>
                  <DatePicker
                    id="calendar"
                    name="date"
                    dateFormat="MMMM/yyyy"
                    showMonthYearPicker
                    minDate={subMonths(new Date(2020, 8, 1), 1)}
                    maxDate={addMonths(
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ),
                      0
                    )}
                    className="input-list__input-item--calendar input-list__input-item--monthly-report"
                    selected={
                      !getInputMonthlyReportPage.params?.date
                        ? new Date()
                        : new Date(
                            +getInputMonthlyReportPage.params.date.split(
                              '-'
                            )[0],
                            +getInputMonthlyReportPage.params.date.split(
                              '-'
                            )[1] - 1,
                            1
                          )
                    }
                    onChange={(date: Date) => {
                      dispatch(
                        MonthlyReportActions.setDate(
                          `${date.getFullYear()}-${date.getMonth() + 1}-1`
                        )
                      );
                    }}
                  />
                </S.Calendar>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </S.InputList>
      {children}
    </S.Header>
  );
};

export default InputList;
