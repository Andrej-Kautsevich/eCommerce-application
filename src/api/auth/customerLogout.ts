import apiClient from '../ApiClient';

const customerLogout = () => {
  apiClient.setAnonymousFlow();
};

export default customerLogout;
