import { useCallback } from 'react';
import useApiClient from './useApiClient';
import { useAppDispatch } from '../../shared/store/hooks';
import { fetchCategories } from '../../shared/store/auth/productsSlice';

export type FetchQueryArgs = {
  limit?: number;
  filter?: string | string[];
  sort?: string | string[];
};

const useProduct = () => {
  const { apiRoot } = useApiClient();
  const dispatch = useAppDispatch();

  const getProduct = useCallback(
    (ID: string) => {
      if (!apiRoot) {
        throw new Error('ApiRoot is not defined');
      }
      return apiRoot.productProjections().withId({ ID }).get().execute();
    },
    [apiRoot],
  );

  const getCategories = useCallback(async () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    const response = await apiRoot.categories().get().execute();
    return dispatch(fetchCategories(response.body));
  }, [apiRoot, dispatch]);

  const getProducts = useCallback(
    async (queryArgs?: FetchQueryArgs) => {
      if (!apiRoot) {
        throw new Error('ApiRoot is not defined');
      }
      if (queryArgs) return apiRoot.productProjections().search().get({ queryArgs }).execute();

      return apiRoot.productProjections().get().execute();
    },
    [apiRoot],
  );

  return { getProduct, getProducts, getCategories };
};

export default useProduct;
