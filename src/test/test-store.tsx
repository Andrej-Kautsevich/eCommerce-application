import { Store, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../shared/store';

const createTestStore = (initialState?: Record<string, unknown>): Store => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return store;
};

export default createTestStore;
