import { configureStore } from "@reduxjs/toolkit";
import note from './note/slice';
import navbar from './navbar/slice';
import header from './header/slice';

export const store = configureStore({
  reducer: {
    note,
    navbar,
    header
  }
});

export type RootState = ReturnType<typeof store.getState>;