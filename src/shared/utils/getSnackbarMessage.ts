import { TFunction } from 'i18next';
import { SnackbarMessages } from '../types/enum';

// Get translated message from enum keys
const getSnackbarMessage = (message: SnackbarMessages, t: TFunction): string => {
  const messageMap = {
    [SnackbarMessages.GENERAL_ERROR]: t('GENERAL_ERROR'),
    [SnackbarMessages.CART_FETCH_ERROR]: t('CART_FETCH_ERROR'),
    [SnackbarMessages.ADD_ITEM_FETCH_ERROR]: t('ADD_ITEM_FETCH_ERROR'),
    [SnackbarMessages.DELETE_ITEM_FETCH_ERROR]: t('DELETE_ITEM_FETCH_ERROR'),
    [SnackbarMessages.PASSWORD_CHANGE_SUCCESS]: t('PASSWORD_CHANGE_SUCCESS'),
    [SnackbarMessages.CUSTOMER_INFO_CHANGE_SUCCESS]: t('CUSTOMER_INFO_CHANGE_SUCCESS'),
    [SnackbarMessages.ADD_ITEM_SUCCESS]: t('ADD_ITEM_SUCCESS'),
    [SnackbarMessages.REMOVE_ITEM_SUCCESS]: t('REMOVE_ITEM_SUCCESS'),
    [SnackbarMessages.DISCOUNT_SUCCESS]: t('DISCOUNT_SUCCESS'),
  };

  return messageMap[message] || message;
};

export default getSnackbarMessage;
