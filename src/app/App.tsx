/* eslint-disable @typescript-eslint/no-misused-promises */
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { useEffect } from 'react';
import useApiClient from '../api/useApiClient';
import { useCustomer, useCustomerAuth } from '../api/hooks';

const App = () => {
  const user: MyCustomerSignin = { email: 'example@example.com', password: 'example' };

  const { apiRoot, setAnonymousFlow, setPasswordFlow } = useApiClient();

  useEffect(() => {
    if (!apiRoot) {
      setAnonymousFlow();
    }
  }, [apiRoot, setAnonymousFlow]);

  const { customerLogin, customerLogOut } = useCustomerAuth();
  const { getCustomer } = useCustomer();

  const login = async () => {
    await customerLogin(user).then(() => setPasswordFlow(user));
  };

  const getUser = async () => {
    await getCustomer();
  };

  const logOut = async () => {
    customerLogOut();
  };

  return (
    <div>
      <button type="button" onClick={login}>
        click!
      </button>
      <button type="button" onClick={getUser}>
        getCart!
      </button>
      <button type="button" onClick={logOut}>
        logOut!
      </button>
    </div>
  );
};

export default App;
