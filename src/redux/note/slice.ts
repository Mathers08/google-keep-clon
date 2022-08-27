import { INote, NoteState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NoteState = {
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
    setFormColor: (state, action: PayloadAction<string>) => {
      state.formColor = action.payload;
    },
    setIsNotePined: (state, action: PayloadAction<boolean>) => {
      state.isNotePined = action.payload;
    },
    setTextareaVisible: (state, action: PayloadAction<boolean>) => {
      state.isTextareaVisible = action.payload;
    },
    setIsNoteListColumn: (state, action: PayloadAction<boolean>) => {
      state.isNoteListColumn = action.payload;
    },
    addNote: (state, action: PayloadAction<INote>) => {
      state.isNotePined
        ? state.pinedNotes.unshift(action.payload)
        : state.notes.unshift(action.payload);
    }
  }
});

export const {
  setFormColor, setIsNotePined, setTextareaVisible, setIsNoteListColumn, addNote
} = slice.actions;
export default slice.reducer;