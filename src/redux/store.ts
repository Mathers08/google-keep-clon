import { configureStore } from "@reduxjs/toolkit";
import form from './form/slice';
import navbar from './navbar/slice';
import header from './header/slice';
import notes from './notes/slice';
import { loadState, saveState } from "../utils";

export const setupStore = () => configureStore({
  reducer: {
    form,
    navbar,
    header,
    notes
  },
  preloadedState: loadState()
});

export const store = setupStore();
store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
