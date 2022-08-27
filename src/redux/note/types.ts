export interface INote {
  id: number;
  header: string;
  note: string;
  color: string;
  pined: boolean;
}

export interface NoteState {
  notes: INote[];
  pinedNotes: INote[];
  formColor: string;
  isNotePined: boolean;
  isTextareaVisible: boolean;
  isNoteListColumn: boolean;
}