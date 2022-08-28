import { INote, NoteState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NoteState = {
  headerText: '',
  isColorBlockVisible: false,
  notes: [],
  pinedNotes: [],
  formColor: 'rgb(32, 33, 36)',
  isNotePined: false,
  isTextareaVisible: false,
  isNoteListColumn: false
};

export const slice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setHeaderText: (state, action: PayloadAction<string>) => {
      state.headerText = action.payload;
    },
    setIsColorBlockVisible: (state, action: PayloadAction<boolean>) => {
      state.isColorBlockVisible = action.payload;
    },
    setFormColor: (state, action: PayloadAction<string>) => {
      state.formColor = action.payload;
    },
    setIsNotePined: (state, action: PayloadAction<boolean>) => {
      state.isNotePined = action.payload;
    },
    setIsTextareaVisible: (state, action: PayloadAction<boolean>) => {
      state.isTextareaVisible = action.payload;
    },
    setIsNoteListColumn: (state, action: PayloadAction<boolean>) => {
      state.isNoteListColumn = action.payload;
    },
    addNote: (state, action: PayloadAction<INote>) => {
      state.isNotePined
        ? state.pinedNotes.unshift(action.payload)
        : state.notes.unshift(action.payload);
      state.headerText = '';
      state.isColorBlockVisible = false;
      state.isNotePined = false;
      state.formColor = 'rgb(32, 33, 36)';
      state.isTextareaVisible = false;
    }
  }
});

export const {
  setHeaderText,
  setIsColorBlockVisible,
  setFormColor,
  setIsNotePined,
  setIsTextareaVisible,
  setIsNoteListColumn,
  addNote
} = slice.actions;
export default slice.reducer;