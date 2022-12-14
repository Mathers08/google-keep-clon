import { ILabel } from "../navbar/types";

export interface INote {
  id: string;
  header: string;
  note: string;
  color: string;
  image: string;
  isPinned: boolean;
  isSelected: boolean;
  isDeleted: boolean;
  isArchived: boolean;
  isColorBlockVisible: boolean;
  isLabelPopupVisible: boolean;
  noteLabels: ILabel[]
}

export interface NotesState {
  notes: INote[];
  labels: ILabel[]
}
