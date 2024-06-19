/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LanguagesKeys } from '../../types/enum';

interface LocalizationState {
  language: LanguagesKeys;
}

const initialState: LocalizationState = {
  language: LanguagesKeys.EN,
};

const localizationSlice = createSlice({
  name: 'localizationSlice',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguagesKeys>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = localizationSlice.actions;

export default localizationSlice.reducer;
