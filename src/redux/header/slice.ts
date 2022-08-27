import { HeaderState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HeaderState = {
  isSettingsPopupVisible: false
};

export const slice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setIsSettingsPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.isSettingsPopupVisible = action.payload;
    }
  }
});

export const { setIsSettingsPopupVisible } = slice.actions;
export default slice.reducer;