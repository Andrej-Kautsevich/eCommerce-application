import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import apiClient from '../ApiClient';

const changePassword = (customerChangePassword: MyCustomerChangePassword) => {
  return apiClient.apiRoot.me().password().post({ body: customerChangePassword }).execute();
};

export default changePassword;
