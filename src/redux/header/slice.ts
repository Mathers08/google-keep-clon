import { NavbarState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavbarState = {
  selectedId: 1,
  isNavbarHidden: false
};

export const slice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    setIsNavbarHidden: (state, action: PayloadAction<boolean>) => {
      state.isNavbarHidden = action.payload;
    }
  }
});

export const { setSelectedId, setIsNavbarHidden } = slice.actions;
export default slice.reducer;