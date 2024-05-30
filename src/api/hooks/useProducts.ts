import { useCallback } from 'react';
import useApiClient from './useApiClient';

const useProducts = () => {
  const { apiRoot } = useApiClient();

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

  return { getProducts };
};

export default useProducts;
