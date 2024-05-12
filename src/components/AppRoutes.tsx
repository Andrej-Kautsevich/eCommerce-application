import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router';
import AuthContext from './context';

const AppRoutes = () => {
  const isAuth = useContext(AuthContext);

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
