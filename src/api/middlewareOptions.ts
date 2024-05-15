import { CustomerSignin } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import tokenCache from '../shared/utils/tokenCache';

export const middlewareOptions = {
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  scopes: [import.meta.env.VITE_CTP_SCOPES],
  hostAuth: import.meta.env.VITE_CTP_AUTH_URL,
  hostApi: import.meta.env.VITE_CTP_API_URL,
  clientId: import.meta.env.VITE_CTP_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: middlewareOptions.hostApi,
  fetch,
};

export const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: middlewareOptions.hostAuth,
  projectKey: middlewareOptions.projectKey,
  credentials: {
    clientId: middlewareOptions.clientId,
    clientSecret: middlewareOptions.clientSecret,
  },
  scopes: middlewareOptions.scopes,
  tokenCache,
  fetch,
};

export const getRefreshAuthMiddlewareOptions = (refreshToken: string): RefreshAuthMiddlewareOptions => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: middlewareOptions.hostAuth,
    projectKey: middlewareOptions.projectKey,
    credentials: {
      clientId: middlewareOptions.clientId,
      clientSecret: middlewareOptions.clientSecret,
    },
    refreshToken,
    tokenCache,
    fetch,
  };
  return refreshAuthMiddlewareOptions;
};

export const getPasswordAuthMiddlewareOptions = (user: CustomerSignin): PasswordAuthMiddlewareOptions => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: middlewareOptions.hostAuth,
    projectKey: middlewareOptions.projectKey,
    credentials: {
      clientId: middlewareOptions.clientId,
      clientSecret: middlewareOptions.clientSecret,
      user: {
        username: user.email,
        password: user.password,
      },
    },
    scopes: middlewareOptions.scopes,
    tokenCache,
    fetch,
  };
  return passwordAuthMiddlewareOptions;
};
