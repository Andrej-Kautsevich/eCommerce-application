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
