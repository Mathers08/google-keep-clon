import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, NotesState } from "./types";
import { ColorsEnum, ImagesEnum } from "../form/types";
import { v4 as uuidv4 } from 'uuid';
import { ILabel } from "../navbar/types";

const initialState: NotesState = {
  notes: [],
  labels: []
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
    toggleNoteColorBlock: (state, action: PayloadAction<string | INote[]>) => {
      if (typeof action.payload === 'string') {
        const note = state.notes.find(n => n.id === action.payload);
        if (note) {
          note.isColorBlockVisible = !note.isColorBlockVisible;
        }
      } else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          const note = state.notes.find(n => n.id === selectedNotes[i].id);
          if (note) {
            note.isColorBlockVisible = !note.isColorBlockVisible;
          }
        }
      }
    },
    setIsLabelPopupVisible: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isLabelPopupVisible = !note.isLabelPopupVisible;
      }
    },
    setNoteColor: (state, action: PayloadAction<{ id: string, color: ColorsEnum }>) => {
      if (typeof action.payload === 'object') {
        const note = state.notes.find(n => n.id === action.payload.id);
        if (note) {
          note.color = action.payload.color;
        }
      } /*else {
        const selectedNotes = action.payload;
        for (let i = 0; i < selectedNotes.length; i++) {
          const note = state.notes.find(n => n.id === selectedNotes[i].id);
          if (note) {
            note.color = action.payload.color;
          }
        }
      }*/
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
    },
    addLabel: (state, action: PayloadAction<ILabel>) => {
      state.labels.push(action.payload);
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(l => l.id !== action.payload);
      state.notes = state.notes.map(n => {
        n.noteLabels = n.noteLabels.filter(l => l.id !== action.payload);
        return n;
      })
    },
    setIsChecked: (state, action: PayloadAction<{ noteId: string, labelId: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.noteId);
      if (note) {
        const label = state.labels.find(l => l.id === action.payload.labelId);
        if (label && label.isLabelChecked) {
          label.isLabelChecked = !label.isLabelChecked;
          note.noteLabels = note.noteLabels.filter(l => l.id !== action.payload.labelId);
        } else if (label && !label.isLabelChecked) {
          label.isLabelChecked = !label.isLabelChecked;
          note.noteLabels.push(label);
        }
      }
    }
  }
});

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
  restoreFromTrash,
  addLabel,
  deleteLabel,
  setIsChecked
} = slice.actions;
export default slice.reducer;