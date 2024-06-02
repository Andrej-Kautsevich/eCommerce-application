/* eslint-disable no-param-reassign */
import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterParams } from '../../types/type';

interface CategoriesState {
  categories: Category[];
  filterParams: FilterParams | undefined;
  sortParam: string | undefined;
}

const initialState: CategoriesState = {
  categories: [],
  filterParams: undefined,
  sortParam: undefined,
};

const productsSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    fetchCategories: (state, action: PayloadAction<CategoryPagedQueryResponse>) => {
      state.categories = action.payload.results;
    },
    setFilterParams: (state, action: PayloadAction<FilterParams>) => {
      state.filterParams = action.payload;
    },
    setSortParam: (state, action: PayloadAction<string>) => {
      state.sortParam = action.payload;
    },
  },
});

export const { fetchCategories, setFilterParams, setSortParam } = productsSlice.actions;

export default productsSlice.reducer;
