import { TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';

const tokenCache: TokenCache = {
  get: () => {
    const string = localStorage.getItem('token-cache');
    if (string) {
      const tokenStore: TokenStore = JSON.parse(string) as TokenStore;
      return tokenStore;
    }
    return {} as TokenStore;
  },
  set: (cache: TokenStore) => {
    const string = JSON.stringify(cache);
    localStorage.setItem('token-cache', string);
  },
};

export default tokenCache;
