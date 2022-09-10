import { configureStore } from "@reduxjs/toolkit";
import form from './form/slice';
import navbar from './navbar/slice';
import header from './header/slice';
import notes from './notes/slice';

export const store = configureStore({
  reducer: {
    form,
    navbar,
    header,
    notes
  }
});

export type RootState = ReturnType<typeof store.getState>;