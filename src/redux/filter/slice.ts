import { FilterState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: FilterState = {
  searchValue: ''
};

export const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    }
  }
});

export const { setSearchValue } = slice.actions;
export default slice.reducer;