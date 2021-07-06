import { Middleware } from 'redux';
import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { ThunkAction } from 'redux-thunk';
import { createFilter } from 'redux-persist-transform-filter';

import { Persistor } from 'redux-persist/es/types';
import createRootReducer from './rootReducer';

let persistor: Persistor;
let logger: Middleware | null = null;

const filterPerformanceHistory = createFilter('performanceHistoryPage', ['timer']);

const persistConfig = {
  key: 'root',
  version: 0,
  storage: storageSession,
  blacklist: ['currentStatusPage', 'mixSuggestionPage', 'router', 'monthlyReportPage'],
  transforms: [filterPerformanceHistory],
};

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
export type RootState = ReturnType<typeof rootReducer>;

// const saveSubsetFilter = createFilter('performanceHistoryPage', ['params']);

const router = routerMiddleware(history);

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(process.env.NODE_ENV || '');

if (shouldIncludeLogger) {
  logger = createLogger({
    level: 'info',
    collapsed: true,
  });
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configuredStore: any = (initialState?: RootState) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: logger
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(logger as Middleware, router)
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(router),
    preloadedState: initialState,
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(require('./rootReducer').default));
  }

  persistor = persistStore(store);

  return [store, persistor];
};

export type Store = ReturnType<typeof configuredStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
