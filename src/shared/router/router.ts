import { RouteProps } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import Error404Page from '../../pages/Error404Page';
import BasketPage from '../../pages/BasketPage';
import { RoutePaths } from '../types/enum';
import ProductPage from '../../pages/ProductPage';
import UserProfilePage from '../../pages/UserProfile';
import CatalogPage from '../../pages/CatalogPage';

// Routes available to ALL users add here
const commonRoutes: RouteProps[] = [
  { path: RoutePaths.MAIN, Component: MainPage },
  { path: RoutePaths.ERROR404, Component: Error404Page },
  { path: `${RoutePaths.WATCHES}/:categorySlug`, Component: CatalogPage },
  { path: `${RoutePaths.WATCHES}`, Component: CatalogPage },
  { path: `${RoutePaths.PRODUCT}/*`, Component: ProductPage },
];

// Routes available to AUTHORIZED users add here
const onlyPrivateRoutes: RouteProps[] = [
  { path: RoutePaths.BASKET, Component: BasketPage },
  { path: RoutePaths.PROFILE, Component: UserProfilePage },
];

// Routes available to UNAUTHORIZED users add here
const onlyPublicRoutes: RouteProps[] = [
  { path: RoutePaths.LOGIN, Component: LoginPage },
  { path: RoutePaths.REGISTRATION, Component: RegistrationPage },
];

const extractPaths = (routes: RouteProps[]): string[] => routes.map((route) => route.path as string);
export const onlyPrivatePaths = extractPaths(onlyPrivateRoutes);
export const onlyPublicPaths = extractPaths(onlyPublicRoutes);
export const privateRoutes: RouteProps[] = [...commonRoutes, ...onlyPrivateRoutes];
export const publicRoutes: RouteProps[] = [...commonRoutes, ...onlyPublicRoutes];
