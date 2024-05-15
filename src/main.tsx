import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './app/App';
import ApiClientProvider from './api/ApiClientProvider';
import store, { persistor } from './store';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiClientProvider>
          <App />
        </ApiClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
