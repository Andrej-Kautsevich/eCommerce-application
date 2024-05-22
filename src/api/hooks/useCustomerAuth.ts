import { AuthErrorResponse, ClientResponse, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import useApiClient from './useApiClient';
import { loginError, loginFetch, loginSuccess, logout } from '../../shared/store/auth/authSlice';
import { useAppDispatch } from '../../shared/store/hooks';
import tokenCache from '../../shared/utils/tokenCache';

const useCustomerAuth = () => {
  const dispatch = useAppDispatch();
  const { apiRoot, setAnonymousFlow, setPasswordFlow } = useApiClient();

  const customerLogin = async (user: MyCustomerSignin) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    dispatch(loginFetch());
    return apiRoot
      .me()
      .login()
      .post({ body: user })
      .execute()
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(loginSuccess());
          tokenCache.remove();
          setPasswordFlow(user);
        }
        return response;
      })
      .catch((error: ClientResponse<AuthErrorResponse>) => {
        dispatch(loginError(error.body));
        return undefined;
      });
  };

  const customerSignUp = (user: MyCustomerDraft) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }

    dispatch(loginFetch());
    return apiRoot
      .me()
      .signup()
      .post({ body: user })
      .execute()
      .then((response) => {
        if (response.statusCode === 201) {
          dispatch(loginSuccess());
          tokenCache.remove();
          setPasswordFlow(user);
        }
        return true;
      })
      .catch((signupError: ClientResponse<AuthErrorResponse>) => {
        dispatch(loginError(signupError.body));
        return false;
      }); // TODO add error handle
  };

  const customerLogOut = () => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    dispatch(logout());
    tokenCache.remove();
    setAnonymousFlow();
  };

  return { customerLogin, customerSignUp, customerLogOut };
};

export default useCustomerAuth;
