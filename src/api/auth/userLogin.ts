import { MyCustomerSignin } from '@commercetools/platform-sdk';
import apiClient from '../ApiClient';

const userLogin = (user: MyCustomerSignin) => {
  return apiClient.apiRoot.me().login().post({ body: user }).execute();
};

export default userLogin;
