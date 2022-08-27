import { configureStore } from "@reduxjs/toolkit";
import filter from './filter/slice';
import note from './note/slice';

export const store = configureStore({
  reducer: {
    filter,
    note
  }
});

export type RootState = ReturnType<typeof store.getState>;