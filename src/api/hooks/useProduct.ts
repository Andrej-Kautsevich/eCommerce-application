import useApiClient from './useApiClient';

const useProduct = () => {
  const { apiRoot } = useApiClient();

  const getProduct = (key: string) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot.productProjections().withKey({ key }).get().execute();
  };

  return { getProduct };
};

export default useProduct;
