import './reset.css';
import './App.css';
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppRoutes from '../components/AppRoutes';
import AuthContext from '../components/context';
import tokenCache from '../shared/utils/tokenCache';
import { RootState } from '../shared/store';
import { useApiClient } from '../api/hooks';
import theme from '../components/theme';

const App = () => {
  interface AuthState {
    isLoggedIn: boolean;
  }

  // get Auth status from local storage
  const getAuthStateFromLocalStorage = (): AuthState => {
    const storedState = localStorage.getItem('persist:auth');
    if (storedState) {
      return JSON.parse(storedState) as AuthState;
    }
    return { isLoggedIn: false };
  };

  const authStateFromLocalStorage = getAuthStateFromLocalStorage();
  const initialIsAuth = authStateFromLocalStorage.isLoggedIn;

  const [isAuth, setIsAuth] = useState<boolean>(initialIsAuth);
  const isAuthCustomer = useSelector((state: RootState) => state.auth.isLoggedIn);
  const authContextValue = useMemo(
    () => ({
      isAuth,
      setIsAuth,
    }),
    [isAuth],
  );

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
      <AuthContext.Provider value={authContextValue}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
