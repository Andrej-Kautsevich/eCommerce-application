import { ByProjectKeyRequestBuilder, CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import tokenCache from '../shared/utils/tokenCache';

class ApiClient {
  /**
   * **usage example**
   *
   * This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
   * ```jsx
   * apiRoot.get().execute()
   * ```
   */
  public apiRoot: ByProjectKeyRequestBuilder;

  private defaultClientBuilder = ApiClient.createDefaultClientBuilder();

  constructor() {
    this.apiRoot = this.setAnonymousFlow();
  }

  private static createDefaultClientBuilder = () => {
    const clientBuilder = new ClientBuilder().withHttpMiddleware(ApiClient.httpMiddlewareOptions);

    if (import.meta.env.DEV) clientBuilder.withLoggerMiddleware(); // Include middleware for logging in dev mode
    return clientBuilder;
  };

  private static getApiRoot = (clientBuilder: ClientBuilder) => {
    return createApiBuilderFromCtpClient(clientBuilder.build()).withProjectKey({
      projectKey: ApiClient.options.projectKey,
    });
  };

  public setAnonymousFlow = () => {
    const clientBuilder = this.defaultClientBuilder.withAnonymousSessionFlow(ApiClient.anonymousAuthMiddlewareOptions);
    this.apiRoot = ApiClient.getApiRoot(clientBuilder);
    return this.apiRoot;
  };

  public setPasswordFlow = (user: CustomerSignin) => {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: ApiClient.options.hostAuth,
      projectKey: ApiClient.options.projectKey,
      credentials: {
        clientId: ApiClient.options.clientId,
        clientSecret: ApiClient.options.clientSecret,
        user: {
          username: user.email,
          password: user.password,
        },
      },
      scopes: ApiClient.options.scopes,
      tokenCache,
      fetch,
    };

    console.log(tokenCache.get());
    const clientBuilder = this.defaultClientBuilder.withPasswordFlow(passwordAuthMiddlewareOptions);

    this.apiRoot = ApiClient.getApiRoot(clientBuilder);
    return this.apiRoot;
  };

  private static options = {
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    scopes: [import.meta.env.VITE_CTP_SCOPES],
    hostAuth: import.meta.env.VITE_CTP_AUTH_URL,
    hostApi: import.meta.env.VITE_CTP_API_URL,
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  };

  // Configure httpMiddlewareOptions
  private static httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: ApiClient.options.hostApi,
    fetch,
  };

  private static anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: ApiClient.options.hostAuth,
    projectKey: ApiClient.options.projectKey,
    credentials: {
      clientId: ApiClient.options.clientId,
      clientSecret: ApiClient.options.clientSecret,
    },
    scopes: ApiClient.options.scopes,
    tokenCache,
    fetch,
  };
}

const apiClient = new ApiClient();

export default apiClient;
