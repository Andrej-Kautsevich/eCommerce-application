import { MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import useApiClient from '../useApiClient';

const useCustomerAuth = () => {
  const { apiRoot, setAnonymousFlow } = useApiClient();

  const customerLogin = (user: MyCustomerSignin) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    return apiRoot.me().login().post({ body: user }).execute();
  };

  const customerSignUp = (user: MyCustomerDraft) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    return apiRoot.me().signup().post({ body: user }).execute();
  };

  const customerLogOut = () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    setAnonymousFlow();
  };

  return { customerLogin, customerSignUp, customerLogOut };
};

export default useCustomerAuth;
