import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, NotesState } from "./types";
import { ColorsEnum, ImagesEnum } from "../form/types";
import {v4 as uuidv4} from 'uuid';

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
    togglePinned: (state, action: PayloadAction<string | INote[]>) => {
      if (typeof action.payload === 'string') {
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
      }
    },
    toggleNoteColorBlock: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isColorBlockVisible = !note.isColorBlockVisible;
      }
    },
    toggleSelected: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isSelected = !note.isSelected;
      }
    },
    setNoteColor: (state, action: PayloadAction<{ id: string, color: ColorsEnum }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.color = action.payload.color;
      }
    },
    setNoteImage: (state, action: PayloadAction<{ id: string, image: ImagesEnum }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.image = action.payload.image.toString();
      }
    },
    deleteNote: (state, action: PayloadAction<string | INote[]>) => {
      if (typeof action.payload === 'string') {
        const deletedNote = state.notes.find(n => n.id === action.payload);
        if (deletedNote) {
          deletedNote.isDeleted = true;
        }
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          const deletedNote = state.notes.find(n => n.id === selectedNotes[i].id);
          if (deletedNote) {
            deletedNote.isDeleted = true;
          }
        }
      }
    },
    copyNote: (state, action: PayloadAction<string | INote[]>) => {
      if (typeof action.payload === 'string') {
        const note = state.notes.find(n => n.id === action.payload);
        if (note) {
          const newNote = { ...note };
          newNote.id = uuidv4();
          state.notes.unshift(newNote);
        }
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          const newNotes = { ...selectedNotes[i] };
          newNotes.id = uuidv4();
          state.notes.unshift(newNotes);
        }
      }
    },
    deleteFromTrash: (state, action: PayloadAction<string | INote[]>) => {
      if (typeof action.payload === 'string') {
        state.notes = state.notes.filter(n => n.id !== action.payload);
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          state.notes = state.notes.filter(n => n.id !== selectedNotes[i].id);
        }
      }
    },
    restoreFromTrash: (state, action: PayloadAction<string | INote[]>) => {
      if (typeof action.payload === 'string') {
        const note = state.notes.find(n => n.id === action.payload);
        if (note) {
          note.isDeleted = false;
        }
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          const restoredNote = state.notes.find(n => n.id === selectedNotes[i].id);
          if (restoredNote) {
            restoredNote.isDeleted = false;
          }
        }
      }
    }
  }
});

export const {
  addNote,
  togglePinned,
  toggleNoteColorBlock,
  toggleSelected,
  setNoteColor,
  setNoteImage,
  deleteNote,
  copyNote,
  deleteFromTrash,
  restoreFromTrash
} = slice.actions;
export default slice.reducer;