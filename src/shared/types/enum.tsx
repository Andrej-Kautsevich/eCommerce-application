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

export enum Status {
  ADD = 'successful addition',
  Remove = 'successful removal',
}

export enum Links {
  RSSCHOOL = 'https://rs.school/',
}

export enum ErrorMessages {
  GENERAL_ERROR = 'Something wrong, please try later!',
  CART_FETCH = 'Failed to fetch cart, please try later!',
  ADD_ITEM_FETCH = 'Error adding item to cart',
  DELETE_ITEM_FETCH = 'Error deleting item from cart',
  PASSWORD_CHANGE_SUCCESS = 'Password has been successfully changed.',
  CUSTOMER_INFO_CHANGE_SUCCESS = 'Successfully updated',
}
