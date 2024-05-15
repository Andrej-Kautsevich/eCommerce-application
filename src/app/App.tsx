import './reset.css';
import './App.css';
import { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppRoutes from '../components/AppRoutes';
import AuthContext from '../components/context';
import theme from '../components/theme';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const authContextValue = useMemo(
    () => ({
      isAuth,
      setIsAuth,
    }),
    [isAuth, setIsAuth],
  );

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
