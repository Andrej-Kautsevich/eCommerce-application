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

  return { getProduct };
};

export default useProduct;
