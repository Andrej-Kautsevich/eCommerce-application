import { RouteProps } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import Error404Page from '../pages/Error404Page';
import BasketPage from '../pages/BasketPage';

const commonRoutes: RouteProps[] = [
  { path: '/', Component: MainPage },
  { path: '/login', Component: LoginPage },
  { path: '/registration', Component: RegistrationPage },
  { path: '*', Component: Error404Page },
];

export const privateRoutes: RouteProps[] = [...commonRoutes, { path: '/basket', Component: BasketPage }];

export const publicRoutes: RouteProps[] = [...commonRoutes, { path: '/basket', Component: LoginPage }];
