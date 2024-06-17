import { TFunction } from 'i18next';
import { SnackbarMessages } from '../types/enum';

const getSnackbarMessage = (message: SnackbarMessages, t: TFunction): string => {
  const messageMap = {
    [SnackbarMessages.GENERAL_ERROR]: t('GENERAL_ERROR'),
    [SnackbarMessages.CART_FETCH_ERROR]: t('CART_FETCH_ERROR'),
    [SnackbarMessages.ADD_ITEM_FETCH_ERROR]: t('Error adding item to cart'),
    [SnackbarMessages.DELETE_ITEM_FETCH_ERROR]: t('Error deleting item from cart'),
    [SnackbarMessages.PASSWORD_CHANGE_SUCCESS]: t('Password has been successfully changed.'),
    [SnackbarMessages.CUSTOMER_INFO_CHANGE_SUCCESS]: t('Successfully updated'),
    [SnackbarMessages.ADD_ITEM_SUCCESS]: t('successful addition'),
    [SnackbarMessages.REMOVE_ITEM_SUCCESS]: t('successful removal'),
  };

  return messageMap[message] || message;
};

export default getSnackbarMessage;
