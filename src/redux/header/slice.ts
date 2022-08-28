import { HeaderState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HeaderState = {
  isSettingsPopupVisible: false,
  searchValue: ''
};

export const slice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setIsSettingsPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.isSettingsPopupVisible = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    }
  }
});

export const { setIsSettingsPopupVisible, setSearchValue } = slice.actions;
export default slice.reducer;