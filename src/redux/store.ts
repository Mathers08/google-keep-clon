import { configureStore } from "@reduxjs/toolkit";
import filter from './filter/slice';
import note from './note/slice';
import form from './form/slice';
import navbar from './navbar/slice';
import header from './header/slice';

export const store = configureStore({
  reducer: {
    filter,
    note,
    form,
    navbar,
    header
  }
});

export type RootState = ReturnType<typeof store.getState>;