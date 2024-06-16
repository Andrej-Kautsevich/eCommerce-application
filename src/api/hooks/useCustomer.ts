import { MyCustomerChangePassword, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { useCallback } from 'react';
import useApiClient from './useApiClient';

const useCustomer = () => {
  const { apiRoot } = useApiClient();
  const getCustomer = useCallback(() => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot
      .me()
      .get()
      .execute()
      .then((response) => response.body);
  }, [apiRoot]);

  const getCart = useCallback(() => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    // return apiRoot.me().activeCart().get().execute();
    return apiRoot.me().carts().get().execute();
  }, [apiRoot]);

  /**
   *
   * @param version Expected version of the Customer on which the changes should be applied.
   *
   * @param actions {Update actions to be performed on the Customer. @see https://docs.commercetools.com/api/projects/me-profile#update-actions
   *
   * **action example**
   * Change User email
   * ```jsx
   * {
   * "action": "changeEmail",
   */
  const customerUpdate = (version: number, actions: MyCustomerUpdateAction[]) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot.me().post({ body: { version, actions } }).execute();
  };

  const changePassword = (customerChangePassword: MyCustomerChangePassword) => {
    if (!apiRoot) {
      throw new Error('ApiRoot is not defined');
    }
    return apiRoot.me().password().post({ body: customerChangePassword }).execute();
  };

  return { getCustomer, getCart, customerUpdate, changePassword };
};

export default useCustomer;
