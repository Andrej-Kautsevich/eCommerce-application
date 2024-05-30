import { useCallback } from 'react';
import useApiClient from './useApiClient';

const useProduct = () => {
  const { apiRoot } = useApiClient();

  const getProduct = useCallback(
    (key: string) => {
      if (!apiRoot) {
        throw new Error('ApiRoot is not defined');
      }
      return apiRoot.productProjections().withKey({ key }).get().execute();
    },
    [apiRoot],
  );

  const getProducts = useCallback(() => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot
      .productProjections()
      .get()
      .execute()
      .then((response) => response.body);
  }, [apiRoot]);

  return { getProduct, getProducts };
};

export default useProduct;
