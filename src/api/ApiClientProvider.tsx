import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  Customer,
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  anonymousAuthMiddlewareOptions,
  getPasswordAuthMiddlewareOptions,
  getRefreshAuthMiddlewareOptions,
  httpMiddlewareOptions,
  middlewareOptions,
} from './utils/middlewareOptions';

// Create a context for the API client
export const ApiClientContext = createContext<ApiRootContextType | undefined>(undefined);

type ApiRootContextType = {
  apiRoot: ByProjectKeyRequestBuilder | undefined;
  setPasswordFlow: (user: CustomerSignin) => Promise<ClientResponse<Customer>>;
  setAnonymousFlow: () => void;
  setTokenFlow: (token: string) => void;
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

  const setAnonymousFlow = useCallback(async () => {
    const clientBuilder = defaultClientBuilder.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);
    const newApiRoot = getApiRoot(clientBuilder);
    setApiRoot(newApiRoot);
  }, [defaultClientBuilder, getApiRoot]);

  const setPasswordFlow = useCallback(
    async (user: CustomerSignin) => {
      const passwordAuthMiddlewareOptions = getPasswordAuthMiddlewareOptions(user);
      const clientBuilder = defaultClientBuilder.withPasswordFlow(passwordAuthMiddlewareOptions);
      const newApiRoot = getApiRoot(clientBuilder);
      setApiRoot(newApiRoot);
      // need to get token immediately
      return newApiRoot.me().get().execute();
    },
    [getApiRoot, defaultClientBuilder],
  );

  const setTokenFlow = useCallback(
    async (refreshToken: string) => {
      const refreshAuthMiddlewareOptions = getRefreshAuthMiddlewareOptions(refreshToken);
      const clientBuilder = defaultClientBuilder.withRefreshTokenFlow(refreshAuthMiddlewareOptions);
      const newApiRoot = getApiRoot(clientBuilder);
      setApiRoot(newApiRoot);
    },
    [getApiRoot, defaultClientBuilder],
  );

  const value = useMemo(
    () => ({ apiRoot, setApiRoot, setAnonymousFlow, setPasswordFlow, setTokenFlow }),
    [apiRoot, setAnonymousFlow, setPasswordFlow, setTokenFlow],
  );

  return <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;
};

export default ApiClientProvider;
