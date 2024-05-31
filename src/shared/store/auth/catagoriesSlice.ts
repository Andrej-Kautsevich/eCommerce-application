/* eslint-disable no-param-reassign */
import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    fetchCategories: (state, action: PayloadAction<CategoryPagedQueryResponse>) => {
      state.categories = action.payload.results;
    },
  },
});

export const { fetchCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
