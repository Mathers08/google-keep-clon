import { configureStore } from "@reduxjs/toolkit";
import filter from './filter/slice';
import note from './note/slice';
import form from './form/slice';

export const store = configureStore({
  reducer: {
    filter,
    note,
    form
  }
});

export type RootState = ReturnType<typeof store.getState>;