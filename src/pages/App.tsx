import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeProviderMui } from '@material-ui/styles';

import { Persistor } from 'redux-persist/es/types';

import Loading from 'components/Loading';

import { muiTheme } from 'styles/theme/muiTheme';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global';
import { Store } from '../store';

type Props = {
  store: Store;
  history: History;
  persistor: Persistor;
};

const App = ({ store, history, persistor }: Props) => {
  const Router = React.lazy(() => import('routes/App'));

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <ThemeProviderMui theme={muiTheme}>
            <PersistGate persistor={persistor}>
              <Suspense fallback={<Loading />}>
                <Router />
              </Suspense>
              <GlobalStyle />
            </PersistGate>
          </ThemeProviderMui>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
