import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppRoutes from '../components/AppRoutes';
import tokenCache from '../shared/utils/tokenCache';
import { RootState } from '../shared/store';
import { useApiClient } from '../api/hooks';
import theme from '../shared/ui/theme';

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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
