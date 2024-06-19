export enum RoutePaths {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ERROR404 = '*',
  BASKET = '/basket',
  PRODUCT = '/product',
  PROFILE = '/profile',
  WATCHES = '/watches',
  ABOUT = '/about',
}

export enum StoreCountries {
  BELARUS = 'BY',
  KAZAKHSTAN = 'KZ',
  UKRAINE = 'UA',
}

export enum FilterCategories {
  CATEGORIES = 'categories.id',
  SEARCH = 'text.en',
}

export enum SortNames {
  DEFAULT = 'default',
  PRICE_ASC = 'price: low to high',
  PRICE_DESC = 'price: high to low',
  NAME = 'name: alphabetically',
}

export enum Currency {
  USD = 'USD',
}

export enum Links {
  RSSCHOOL = 'https://rs.school/',
}

export enum SnackbarMessages {
  GENERAL_ERROR = 'Something wrong, please try later!',
  CART_FETCH_ERROR = 'Failed to fetch cart, please try later!',
  ADD_ITEM_FETCH_ERROR = 'Error adding item to cart',
  DELETE_ITEM_FETCH_ERROR = 'Error deleting item from cart',
  PASSWORD_CHANGE_SUCCESS = 'Password has been successfully changed.',
  CUSTOMER_INFO_CHANGE_SUCCESS = 'Successfully updated',
  ADD_ITEM_SUCCESS = 'successful addition',
  REMOVE_ITEM_SUCCESS = 'successful removal',
  DISCOUNT_SUCCESS = 'successfully applied',
  DISCOUNT_INFO = 'The promo code has already been applied',
}

export enum LanguagesKeys {
  EN = 'en',
  RU = 'ru',
}
