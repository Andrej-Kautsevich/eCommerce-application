import { FilterParams } from '../types/type';

const parseFilterParams = (filterParams: FilterParams) => {
  const filterString = Object.entries(filterParams)
    .map(([key, value]) => {
      if (value) {
        return `${key}:${value}`;
      }
      return undefined;
    })
    .join(',');
  return filterString;
};

export default parseFilterParams;
