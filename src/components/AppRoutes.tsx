import { useContext } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router';
import AuthContext from './context';
import RoutePaths from '../shared/types/enum';

const AppRoutes = () => {
  const isAuth = useContext(AuthContext);

  // changing the address bar
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuth?.isAuth && (location.pathname === '/registration' || location.pathname === '/login')) {
    navigate(RoutePaths.MAIN);
  } else if (!isAuth?.isAuth && location.pathname === '/basket') {
    navigate(RoutePaths.LOGIN);
  }

  return isAuth?.isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} Component={route.Component} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} Component={route.Component} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
