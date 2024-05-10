import { MyCustomerDraft } from '@commercetools/platform-sdk';
import apiClient from '../ApiClient';

const userSignUp = (user: MyCustomerDraft) => {
  return apiClient.apiRoot.me().signup().post({ body: user }).execute();
};

export default userSignUp;
