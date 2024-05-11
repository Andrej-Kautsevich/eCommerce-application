import { CustomerSignin } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

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
  // tokenCache,
  fetch,
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
    // tokenCache,
    fetch,
  };
  return passwordAuthMiddlewareOptions;
};
