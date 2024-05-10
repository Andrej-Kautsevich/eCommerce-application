/* eslint-disable @typescript-eslint/no-misused-promises */
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { customerLogin, customerLogout } from '../api/auth';
import apiClient from '../api/ApiClient';
import { getCustomer } from '../api/customer';

const App = () => {
  const user: MyCustomerSignin = { email: 'example@example.com', password: 'example' };

  const login = async () => {
    await customerLogin(user)
      .then((res) => console.log(res.body))
      .then(() => apiClient.setPasswordFlow(user));
  };

  const getUser = async () => {
    await getCustomer();
  };

  const logOut = async () => {
    customerLogout();
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
