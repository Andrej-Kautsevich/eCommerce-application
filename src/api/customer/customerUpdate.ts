import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import apiClient from '../ApiClient';

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
 * "email": "email@example.com"
 * }
 * ```
 */
const customerUpdate = (version: number, actions: MyCustomerUpdateAction[]) => {
  return apiClient.apiRoot.me().post({ body: { version, actions } }).execute();
};

export default customerUpdate;
