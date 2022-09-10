import {ColorsEnum, ImagesEnum, INote} from "../form/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { NotesState } from "./types";

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
    togglePinned: (state, action: PayloadAction<number>): void => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.pined = !note.pined;
      }
    }
  }
});

export const {
  addNote,
    togglePinned
} = slice.actions;
export default slice.reducer;