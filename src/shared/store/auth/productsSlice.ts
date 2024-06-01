/* eslint-disable no-param-reassign */
import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterParams } from '../../types/type';

interface CategoriesState {
  categories: Category[];
  filterParams: FilterParams | null;
}

const initialState: CategoriesState = {
  categories: [],
  filterParams: null,
};

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    fetchCategories: (state, action: PayloadAction<CategoryPagedQueryResponse>) => {
      state.categories = action.payload.results;
    },
    setFilterParams: (state, action: PayloadAction<FilterParams>) => {
      state.filterParams = action.payload;
    },
  },
});

export const { fetchCategories, setFilterParams } = categoriesSlice.actions;

export default categoriesSlice.reducer;
