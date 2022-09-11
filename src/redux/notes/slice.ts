import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, NotesState } from "./types";
import { ColorsEnum, ImagesEnum } from "../form/types";

const initialState: NotesState = {
  notes: [],
};

export const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<INote>) => {
      state.notes.unshift(action.payload);
    },
    togglePinned: (state, action: PayloadAction<number>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
      }
    },
    toggleNoteColorBlock: (state, action: PayloadAction<number>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isColorBlockVisible = !note.isColorBlockVisible;
      }
    },
    setNoteColor: (state, action: PayloadAction<{ id: number, color: ColorsEnum }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.color = action.payload.color;
      }
    },
    setNoteImage: (state, action: PayloadAction<{ id: number, image: ImagesEnum }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.image = action.payload.image.toString();
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(n => n.id !== action.payload)
    },
  }
});

export const {
  addNote,
  togglePinned,
  toggleNoteColorBlock,
  setNoteColor,
  setNoteImage,
  deleteNote
} = slice.actions;
export default slice.reducer;