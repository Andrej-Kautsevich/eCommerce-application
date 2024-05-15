import { MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import useApiClient from '../useApiClient';
import { loginError, loginFetch, loginSuccess } from '../../store/auth/authSlice';
import useAppDispatch from '../../store/hooks';

const useCustomerAuth = () => {
  // const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { apiRoot, setAnonymousFlow, setPasswordFlow } = useApiClient();

  const customerLogin = async (user: MyCustomerSignin) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    dispatch(loginFetch());
    // return apiRoot.me().login().post({ body: user }).execute();
    try {
      await apiRoot
        .me()
        .login()
        .post({ body: user })
        .execute()
        .then((response) => {
          if (response.statusCode === 200) {
            dispatch(loginSuccess());
            // TODO remove token
            setPasswordFlow(user);
          }
        })
        // TODO return error message
        .catch(() => dispatch(loginError()));
    } catch (error) {
      // console.log(error);
    }
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
