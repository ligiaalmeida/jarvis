import { createRoot } from 'react-dom/client';

import { history, configuredStore } from './store';

import App from './pages/App';

const [store, persistor] = configuredStore();
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App persistor={persistor} store={store} history={history} />);
