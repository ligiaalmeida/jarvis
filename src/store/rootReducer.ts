import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import monthlyReportPage from 'store/ducks/monthlyReport';
import performanceHistoryPage from 'store/ducks/performanceHistory';
import mixSuggestionPage from './ducks/mixSuggestion';
import currentStatusPage from './ducks/currentStatus';
import faultPredictionPage from './ducks/faultPrediction';
import currentFaultsPage from './ducks/currentFaults';
import performancePage from './ducks/performance';
import shiftRegistrationPage from './ducks/shiftRegistration';
import global from './ducks/global';
import polices from './ducks/auth';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    polices,
    global,
    currentStatusPage,
    mixSuggestionPage,
    currentFaultsPage,
    performancePage,
    faultPredictionPage,
    performanceHistoryPage,
    monthlyReportPage,
    shiftRegistrationPage,
  });
}
