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
    togglePinned: (state, action: PayloadAction<number | INote[]>) => {
      if (typeof action.payload === 'number') {
        const note = state.notes.find(n => n.id === action.payload);
        if (note) {
          note.isPinned = !note.isPinned;
        }
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          const note = state.notes.find(n => n.id === selectedNotes[i].id);
          if (note) {
            note.isPinned = !note.isPinned;
          }
        }
        console.log(selectedNotes);
      }
    },
    toggleNoteColorBlock: (state, action: PayloadAction<number>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isColorBlockVisible = !note.isColorBlockVisible;
      }
    },
    toggleSelected: (state, action: PayloadAction<number>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isSelected = !note.isSelected;
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
    deleteNote: (state, action: PayloadAction<number | INote[]>) => {
      if (typeof action.payload === 'number') {
        state.notes = state.notes.filter(n => n.id !== action.payload);
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          state.notes = state.notes.filter(n => n.id !== selectedNotes[i].id);
        }
      }
    },
  }
});

export const {
  addNote,
  togglePinned,
  toggleNoteColorBlock,
  toggleSelected,
  setNoteColor,
  setNoteImage,
  deleteNote
} = slice.actions;
export default slice.reducer;