import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { INote, NotesState } from "./types";
import { ColorsEnum, ImagesEnum } from "../form/types";
import { v4 as uuidv4 } from 'uuid';

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
      setIsLabelPopupVisible: (state, action: PayloadAction<string>) => {
        const note = state.notes.find(n => n.id === action.payload);
        if (note) {
          note.isLabelPopupVisible = !note.isLabelPopupVisible;
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
      selectNote: (state, action: PayloadAction<string | INote[]>) => {
        if (typeof action.payload === 'string') {
          const note = state.notes.find(n => n.id === action.payload);
          if (note) {
            note.isSelected = !note.isSelected;
          }
        } else {
          const selectedNotes = action.payload;
          for (let i = 0; i < selectedNotes.length; i++) {
            const selectedNote = state.notes.find(n => n.id === selectedNotes[i].id);
            if (selectedNote) {
              selectedNote.isSelected = false;
            }
          }
        }
      },
      deleteNote: (state, action: PayloadAction<string | INote[]>) => {
        if (typeof action.payload === 'string') {
          const deletedNote = state.notes.find(n => n.id === action.payload);
          if (deletedNote) {
            deletedNote.isDeleted = true;
            deletedNote.isArchived = false;
            deletedNote.isSelected = false;
          }
        } else {
          const selectedNotes = action.payload;
          for (let i = 0; i < selectedNotes.length; i++) {
            const deletedNote = state.notes.find(n => n.id === selectedNotes[i].id);
            if (deletedNote) {
              deletedNote.isDeleted = true;
              deletedNote.isArchived = false;
              deletedNote.isSelected = false;
            }
          }
        }
      },
      archiveNote: (state, action: PayloadAction<string | INote[]>) => {
        if (typeof action.payload === 'string') {
          const archivedNote = state.notes.find(n => n.id === action.payload);
          if (archivedNote) {
            archivedNote.isArchived = !archivedNote.isArchived;
            archivedNote.isSelected = false;
          }
        } else {
          const selectedNotes = action.payload;
          for (let i = 0; i < selectedNotes.length; i++) {
            const archivedNote = state.notes.find(n => n.id === selectedNotes[i].id);
            if (archivedNote) {
              archivedNote.isArchived = !archivedNote.isArchived;
              archivedNote.isSelected = false;
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
            newNote.isSelected = false;
          }
        } else {
          const selectedNotes = action.payload;
          for (let i = 0; i < selectedNotes.length; i++) {
            const newNotes = { ...selectedNotes[i] };
            newNotes.id = uuidv4();
            state.notes.unshift(newNotes);
            newNotes.isSelected = false;
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
            note.isSelected = false;
          }
        } else {
          const selectedNotes = action.payload;
          for (let i = 0; i < selectedNotes.length; i++) {
            const restoredNote = state.notes.find(n => n.id === selectedNotes[i].id);
            if (restoredNote) {
              restoredNote.isDeleted = false;
              restoredNote.isSelected = false;
            }
          }
        }
      }
    }
  })
;

export const {
  addNote,
  togglePinned,
  toggleNoteColorBlock,
  setIsLabelPopupVisible,
  setNoteColor,
  setNoteImage,
  selectNote,
  deleteNote,
  archiveNote,
  copyNote,
  deleteFromTrash,
  restoreFromTrash
} = slice.actions;
export default slice.reducer;