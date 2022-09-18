import { ILabel, NavbarState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavbarState = {
  selectedId: '1',
  isNavbarHidden: false,
  isLabelBlockVisible: false,
  labels: []
};

export const slice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    addLabel: (state, action: PayloadAction<ILabel>) => {
      state.labels.push(action.payload);
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(l => l.id !== action.payload);
    },
    setIsChecked: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      const label = state.labels.find(l => l.id === action.payload);
      if (label) {
        label.isLabelChecked = !label.isLabelChecked;
      }
    },
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
  addLabel,
  deleteLabel,
  setIsChecked,
  setIsLabelBlockVisible,
  setSelectedId,
  setIsNavbarHidden
} = slice.actions;
export default slice.reducer;