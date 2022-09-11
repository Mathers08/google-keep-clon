import { ColorsEnum, FormState, ImagesEnum } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FormState = {
  id: Math.random(),
  headerText: '',
  isColorBlockVisible: false,
  formColor: ColorsEnum.DEFAULT,
  formImage: ImagesEnum.DEFAULT,
  isNotePined: false,
  isTextareaVisible: false,
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
    },
    setFormColor: (state, action) => {
      state.formColor = action.payload;
    },
    setFormImage: (state, action: PayloadAction<ImagesEnum>) => {
      state.formImage = action.payload;
    },
    setIsNotePined: (state, action: PayloadAction<boolean>) => {
      state.isNotePined = action.payload;
    },
    setIsTextareaVisible: (state, action: PayloadAction<boolean>) => {
      state.isTextareaVisible = action.payload;
    },
    resetForm: (state) => {
      state.headerText = '';
      state.isColorBlockVisible = false;
      state.isTextareaVisible = false;
      state.isNotePined = false;
      state.formColor = ColorsEnum.DEFAULT;
      state.formImage = ImagesEnum.DEFAULT;
    }
  }
});

export const {
  setHeaderText,
  setIsColorBlockVisible,
  setFormColor,
  setFormImage,
  setIsNotePined,
  setIsTextareaVisible,
  resetForm
} = slice.actions;
export default slice.reducer;