import { FilterCategories } from '../types/enum';

const parseSearchParams = (string: string) => {
  const parsedSearchParam = `${FilterCategories.SEARCH}=${string}`;
  return parsedSearchParam;
};

export default parseSearchParams;
