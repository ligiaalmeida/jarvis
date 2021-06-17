import { render } from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

import { history, configuredStore } from './store';

import App from './pages/App';

const [store, persistor] = configuredStore();

document.addEventListener('DOMContentLoaded', () =>
  render(<App persistor={persistor} store={store} history={history} />, document.getElementById('root'))
);
