import { NavbarState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavbarState = {
  selectedId: '1',
  isNavbarHidden: false,
  isLabelBlockVisible: false,
};

export const slice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setIsLabelBlockVisible: (state, action: PayloadAction<boolean>) => {
      state.isLabelBlockVisible = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    setIsNavbarHidden: (state, action: PayloadAction<boolean>) => {
      state.isNavbarHidden = action.payload;
    },
  }
});

export const {
  /*  addLabel,
    deleteLabel,
  setIsChecked,*/
  setIsLabelBlockVisible,
  setSelectedId,
  setIsNavbarHidden
} = slice.actions;
export default slice.reducer;