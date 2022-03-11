import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { history, configuredStore } from './store';

import App from './pages/App';

const [store, persistor] = configuredStore();

ReactDOM.render(
  <BrowserRouter>
    <App persistor={persistor} store={store} history={history} />
  </BrowserRouter>,
  document.getElementById('root')
);
