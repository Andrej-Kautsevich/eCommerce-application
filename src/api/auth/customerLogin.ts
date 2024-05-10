import { MyCustomerSignin } from '@commercetools/platform-sdk';
import apiClient from '../ApiClient';

const customerLogin = (user: MyCustomerSignin) => {
  return apiClient.apiRoot.me().login().post({ body: user }).execute();
};

export default customerLogin;
