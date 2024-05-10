import apiClient from '../ApiClient';

const userLogout = () => {
  return apiClient.setAnonymousFlow();
};

export default userLogout;
