import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRoutes, publicRoutes, onlyPrivatePaths, onlyPublicPaths } from './router';
import RoutePaths from '../shared/types/enum';
import { RootState } from '../shared/store';

const AppRoutes = () => {
  const isAuthCustomer: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  // changing the address bar
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthCustomer && onlyPublicPaths.includes(location.pathname)) {
    navigate(RoutePaths.MAIN);
  } else if (!isAuthCustomer && onlyPrivatePaths.includes(location.pathname)) {
    navigate(RoutePaths.LOGIN);
  }

  return isAuthCustomer ? (
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
