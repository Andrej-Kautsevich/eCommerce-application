import './reset.css';
import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppRoutes from '../components/AppRoutes';
import tokenCache from '../shared/utils/tokenCache';
import { RootState } from '../shared/store';
import { useApiClient } from '../api/hooks';
import theme from '../components/theme';

const App = () => {
  const isAuthCustomer = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { apiRoot, setAnonymousFlow, setTokenFlow } = useApiClient();

  useEffect(() => {
    if (!apiRoot) {
      const refreshToken = tokenCache.get().token;
      // if user has authorization
      // TODO handle anonymous refresh token
      if (isAuthCustomer && refreshToken) {
        setTokenFlow(refreshToken);
      } else {
        setAnonymousFlow();
      }
    }
  }, [apiRoot, setAnonymousFlow, setTokenFlow, isAuthCustomer]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
