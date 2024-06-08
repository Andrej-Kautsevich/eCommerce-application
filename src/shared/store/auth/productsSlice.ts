/* eslint-disable no-param-reassign */
import { AttributeDefinition, Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterParams } from '../../types/type';

interface CategoriesState {
  categories: Category[];
  attributes: AttributeDefinition[];
  filterParams: FilterParams[];
  sortParam: string | undefined;
  searchParam: string | undefined;
}

const initialState: CategoriesState = {
  categories: [],
  attributes: [],
  filterParams: [],
  sortParam: undefined,
  searchParam: undefined,
};

const productsSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    fetchCategories: (state, action: PayloadAction<CategoryPagedQueryResponse>) => {
      state.categories = action.payload.results;
    },
    fetchAttributes: (state, action: PayloadAction<AttributeDefinition[]>) => {
      state.attributes = action.payload;
    },
    setFilterParams: (state, action: PayloadAction<FilterParams>) => {
      const key = Object.keys(action.payload)[0];
      const index = state.filterParams.findIndex((filter) => key in filter);
      if (index !== -1) {
        state.filterParams[index][key] = action.payload[key];
      } else {
        state.filterParams.push(action.payload);
      }
    },
    setSortParam: (state, action: PayloadAction<string>) => {
      state.sortParam = action.payload;
    },
    setSearchParam: (state, action: PayloadAction<string | undefined>) => {
      state.searchParam = action.payload;
    },
  },
});

export const { fetchCategories, fetchAttributes, setFilterParams, setSortParam, setSearchParam } =
  productsSlice.actions;

export default productsSlice.reducer;
