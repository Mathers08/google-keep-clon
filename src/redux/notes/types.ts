export interface INote {
  id: number;
  header: string;
  note: string;
  color: string;
  image: string;
  isPinned: boolean;
  isChosen: boolean;
  isColorBlockVisible: boolean;
}

export interface NotesState {
  notes: INote[];
}