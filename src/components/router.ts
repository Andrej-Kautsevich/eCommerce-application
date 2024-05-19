import { RouteProps } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import Error404Page from '../pages/Error404Page';
import BasketPage from '../pages/BasketPage';
import RoutePaths from '../shared/types/enum';

const commonRoutes: RouteProps[] = [
  { path: RoutePaths.MAIN, Component: MainPage },
  { path: RoutePaths.ERROR404, Component: Error404Page },
];

export const privateRoutes: RouteProps[] = [...commonRoutes, { path: RoutePaths.BASKET, Component: BasketPage }];

export const publicRoutes: RouteProps[] = [
  ...commonRoutes,
  { path: RoutePaths.LOGIN, Component: LoginPage },
  { path: RoutePaths.REGISTRATION, Component: RegistrationPage },
];
