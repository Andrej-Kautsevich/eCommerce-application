import apiClient from '../ApiClient';

const getCustomer = () => {
  return apiClient.apiRoot.me().get().execute();
};

export default getCustomer;
