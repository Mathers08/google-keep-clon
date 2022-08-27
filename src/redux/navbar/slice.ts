import { FormState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FormState = {
  headerText: '',
  isColorBlockVisible: false
};

export const slice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setHeaderText: (state, action: PayloadAction<string>) => {
      state.headerText = action.payload;
    },
    setIsColorBlockVisible: (state, action: PayloadAction<boolean>) => {
      state.isColorBlockVisible = action.payload;
    }
  }
});

export const { setHeaderText, setIsColorBlockVisible } = slice.actions;
export default slice.reducer;