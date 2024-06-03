import { FilterCategories } from './enum';

export type ProductKey = {
  key: string;
};
export type AddressesFields = {
  id?: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};
export type FilterParams = {
  [FilterCategories.CATEGORIES]?: string;
};
