export interface INote {
  id: string;
  header: string;
  note: string;
  color: string;
  image: string;
  isPinned: boolean;
  isSelected: boolean;
  isDeleted: boolean;
  isColorBlockVisible: boolean;
}

export interface NotesState {
  notes: INote[];
}