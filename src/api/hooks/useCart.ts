import useApiClient from './useApiClient';

const useCart = () => {
  const { apiRoot } = useApiClient();
  const createCart = () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();
  };
  return { createCart };
};
export default useCart;
