import './reset.css';
import './App.css';
import { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../components/AppRoutes';
import AuthContext from '../components/context';

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
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
