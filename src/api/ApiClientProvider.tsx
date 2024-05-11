import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { ByProjectKeyRequestBuilder, CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  anonymousAuthMiddlewareOptions,
  getPasswordAuthMiddlewareOptions,
  httpMiddlewareOptions,
  middlewareOptions,
} from './middlewareOptions';
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

  const defaultClientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
  if (import.meta.env.DEV) defaultClientBuilder.withLoggerMiddleware(); // Include middleware for logging in dev mode

  const getApiRoot = useCallback((clientBuilder: ClientBuilder) => {
    return createApiBuilderFromCtpClient(clientBuilder.build()).withProjectKey({
      projectKey: middlewareOptions.projectKey,
    });
  }, []);

  const setAnonymousFlow = useCallback(() => {
    const clientBuilder = defaultClientBuilder.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);
    setApiRoot(getApiRoot(clientBuilder));
  }, [defaultClientBuilder, getApiRoot]);

  const setPasswordFlow = useCallback(
    (user: CustomerSignin) => {
      const passwordAuthMiddlewareOptions = getPasswordAuthMiddlewareOptions(user);
      const clientBuilder = defaultClientBuilder.withPasswordFlow(passwordAuthMiddlewareOptions);
      setApiRoot(getApiRoot(clientBuilder));
    },
    [getApiRoot, defaultClientBuilder],
  );
  const value = useMemo(
    () => ({ apiRoot, setApiRoot, setAnonymousFlow, setPasswordFlow }),
    [apiRoot, setAnonymousFlow, setPasswordFlow],
  );

  return <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;
};

export default ApiClientProvider;
