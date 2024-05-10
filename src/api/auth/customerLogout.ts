import apiClient from '../ApiClient';

const customerLogout = () => {
  return apiClient.setAnonymousFlow();
};

export default customerLogout;
