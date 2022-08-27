import { INote, NoteState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NoteState = {
  notes: [],
  pinedNotes: [],
  formColor: 'rgb(32, 33, 36)',
  isNotePined: false,
  isTextareaVisible: false
};

export const slice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
    },
    setPinedNotes: (state, action: PayloadAction<INote[]>) => {
      state.pinedNotes = action.payload;
    },
    setFormColor: (state, action: PayloadAction<string>) => {
      state.formColor = action.payload;
    },
    setIsNotePined: (state, action: PayloadAction<boolean>) => {
      state.isNotePined = action.payload;
    },
    setTextareaVisible: (state, action: PayloadAction<boolean>) => {
      state.isTextareaVisible = action.payload;
    },
    addNote: (state, action: PayloadAction<INote>) => {
      state.isNotePined
        ? state.pinedNotes.unshift(action.payload)
        : state.notes.unshift(action.payload);
      setFormColor('rgb(32, 33, 36)');
      setIsNotePined(false);
      setTextareaVisible(false);
    }
  }
});

export const {
  setNotes, setPinedNotes, setFormColor, setIsNotePined, setTextareaVisible, addNote
} = slice.actions;
export default slice.reducer;