import { ILabel, NavbarState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavbarState = {
  selectedId: 1,
  isNavbarHidden: false,
  labels: [],
  isLabelBlockVisible: true,
};

export const slice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    addLabel: (state, action: PayloadAction<ILabel>) => {
      state.labels.push(action.payload);
    },
    deleteLabel: (state, action: PayloadAction<number>) => {
      state.labels = state.labels.filter(l => l.id !== action.payload);
    },
    setIsLabelBlockVisible: (state, action: PayloadAction<boolean>) => {
      state.isLabelBlockVisible = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    setIsNavbarHidden: (state, action: PayloadAction<boolean>) => {
      state.isNavbarHidden = action.payload;
    },
  }
});

export const {
  addLabel,
  deleteLabel,
  setIsLabelBlockVisible,
  setSelectedId,
  setIsNavbarHidden
} = slice.actions;
export default slice.reducer;