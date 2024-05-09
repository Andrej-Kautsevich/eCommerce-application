import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  Credentials,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
  // Import middlewares
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = [import.meta.env.VITE_CTP_SCOPES];
const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
const hostApi = import.meta.env.VITE_CTP_API_URL;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

const credentials: Credentials = {
  clientId,
  clientSecret,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostApi,
  fetch,
};

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: hostAuth,
  projectKey,
  credentials,
  scopes,
  fetch,
};

const passwordAuthMiddlewareOptions = (user: UserAuthOptions): PasswordAuthMiddlewareOptions => {
  const options = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user,
    },
    scopes,
    fetch,
  };
  return options;
};

const isDevMode = import.meta.env.MODE === 'development';

// Export the ClientBuilder
export const createPasswordClient = (user: UserAuthOptions) => {
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions(user));

  if (isDevMode) client.withLoggerMiddleware(); // Include middleware for logging in dev mode

  return client.build();
};

export const createAnonymousClient = () => {
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);

  if (isDevMode) client.withLoggerMiddleware(); // Include middleware for logging in dev mode

  return client.build();
};
