import { RouteProps } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import Error404Page from '../pages/Error404Page';
import BasketPage from '../pages/BasketPage';
import Routes from '../shared/types/enum';

const commonRoutes: RouteProps[] = [
  { path: Routes.MAIN, Component: MainPage },
  { path: Routes.LOGIN, Component: LoginPage },
  { path: Routes.REGISTRATION, Component: RegistrationPage },
  { path: Routes.ERROR404, Component: Error404Page },
];

export const privateRoutes: RouteProps[] = [...commonRoutes, { path: Routes.BASKET, Component: BasketPage }];

export const publicRoutes: RouteProps[] = [...commonRoutes, { path: Routes.BASKET, Component: LoginPage }];
