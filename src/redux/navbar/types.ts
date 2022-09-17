export interface ILabel {
  id: number;
  title: string;
}

export interface NavbarState {
  selectedId: number;
  isNavbarHidden: boolean;
  labels: ILabel[]
}