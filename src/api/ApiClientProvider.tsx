import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { ByProjectKeyRequestBuilder, CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
// import tokenCache from '../shared/utils/tokenCache';

// Create a context for the API client
export const ApiClientContext = createContext<ApiRootContextType | undefined>(undefined);

type ApiRootContextType = {
  apiRoot: ByProjectKeyRequestBuilder | undefined;
  setPasswordFlow: (user: CustomerSignin) => void;
  setAnonymousFlow: () => void;
  setApiRoot: React.Dispatch<React.SetStateAction<ByProjectKeyRequestBuilder | undefined>>;
};

interface ApiClientProviderProps {
  children: ReactNode;
}

const ApiClientProvider = ({ children }: ApiClientProviderProps) => {
  const [apiRoot, setApiRoot] = useState<ByProjectKeyRequestBuilder>();

  const options = useMemo(
    () => ({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
      scopes: [import.meta.env.VITE_CTP_SCOPES],
      hostAuth: import.meta.env.VITE_CTP_AUTH_URL,
      hostApi: import.meta.env.VITE_CTP_API_URL,
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    }),
    [],
  );

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: options.hostApi,
    fetch,
  };

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = useMemo(
    () => ({
      host: options.hostAuth,
      projectKey: options.projectKey,
      credentials: {
        clientId: options.clientId,
        clientSecret: options.clientSecret,
      },
      scopes: options.scopes,
      // tokenCache,
      fetch,
    }),
    [options],
  );

  const defaultClientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
  if (import.meta.env.DEV) defaultClientBuilder.withLoggerMiddleware(); // Include middleware for logging in dev mode

  const getApiRoot = useCallback(
    (clientBuilder: ClientBuilder) => {
      return createApiBuilderFromCtpClient(clientBuilder.build()).withProjectKey({
        projectKey: options.projectKey,
      });
    },
    [options],
  );

  const setAnonymousFlow = useCallback(() => {
    const clientBuilder = defaultClientBuilder.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);
    setApiRoot(getApiRoot(clientBuilder));
  }, [defaultClientBuilder, getApiRoot, anonymousAuthMiddlewareOptions]);

  const setPasswordFlow = useCallback(
    (user: CustomerSignin) => {
      const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
        host: options.hostAuth,
        projectKey: options.projectKey,
        credentials: {
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          user: {
            username: user.email,
            password: user.password,
          },
        },
        scopes: options.scopes,
        // tokenCache,
        fetch,
      };

      const clientBuilder = defaultClientBuilder.withPasswordFlow(passwordAuthMiddlewareOptions);
      setApiRoot(getApiRoot(clientBuilder));
    },
    [getApiRoot, defaultClientBuilder, options],
  );
  const value = useMemo(
    () => ({ apiRoot, setApiRoot, setAnonymousFlow, setPasswordFlow }),
    [apiRoot, setAnonymousFlow, setPasswordFlow],
  );

  return <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;
};

export default ApiClientProvider;
