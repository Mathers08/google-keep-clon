export interface INote {
  id: number;
  header: string;
  note: string;
  color: string;
  pined: boolean;
}

export enum ColorsEnum {
  DEFAULT = "transparent",
  RED = "rgb(92, 43, 41)",
  ORANGE = "rgb(97, 74, 25)",
  YELLOW = "rgb(99, 93, 25)",
  GREEN = "rgb(52, 89, 32)",
  BLUE_GREEN = "rgb(22, 80, 75)",
  BLUE = "rgb(45, 85, 94)",
  DARK_BLUE = "rgb(30, 58, 95)",
  PURPLE = "rgb(66, 39, 94)",
  PINK = "rgb(91, 34, 69)",
  BROWN = "rgb(68, 47, 25)",
  GREY = "rgb(68, 47, 25)"
}

export interface NoteState {
  headerText: string;
  isColorBlockVisible: boolean;
  notes: INote[];
  pinedNotes: INote[];
  formColor: ColorsEnum;
  isNotePined: boolean;
  isTextareaVisible: boolean;
  isNoteListColumn: boolean;
}