import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

import { history, configuredStore } from './store';

import App from './pages/App';

const [store, persistor] = configuredStore();

ReactDOM.render(
  <BrowserRouter>
    <App persistor={persistor} store={store} history={history} />
  </BrowserRouter>,
  document.getElementById('root')
);
