import { FilterCategories } from './enum';

export type ProductKey = {
  key: string;
};

export type FilterParams = {
  [FilterCategories.CATEGORIES]?: string[];
};
