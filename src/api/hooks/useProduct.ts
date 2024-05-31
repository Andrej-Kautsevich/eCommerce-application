import { useCallback } from 'react';
import useApiClient from './useApiClient';
import { useAppDispatch } from '../../shared/store/hooks';
import { fetchCategories } from '../../shared/store/auth/catagoriesSlice';

const useProduct = () => {
  const { apiRoot } = useApiClient();
  const dispatch = useAppDispatch();

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

  const getCategories = useCallback(async () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    const response = await apiRoot.categories().get().execute();
    return dispatch(fetchCategories(response.body));
  }, [apiRoot, dispatch]);

  return { getProduct, getProducts, getCategories };
};

export default useProduct;
