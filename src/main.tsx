import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import ApiClientProvider from './api/ApiClientProvider';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ApiClientProvider>
      <App />
    </ApiClientProvider>
  </StrictMode>,
);
