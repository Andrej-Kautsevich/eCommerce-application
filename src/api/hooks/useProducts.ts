import useApiClient from './useApiClient';

const useProducts = () => {
  const { apiRoot } = useApiClient();

  const getProducts = () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot
      .productProjections()
      .get()
      .execute()
      .then((response) => response.body);
  };

  return { getProducts };
};

export default useProducts;
