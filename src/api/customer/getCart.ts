import apiClient from '../ApiClient';

const getCart = () => {
  return apiClient.apiRoot.me().carts().get().execute();
};

export default getCart;
