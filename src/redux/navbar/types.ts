export interface ILabel {
  id: string;
  title: string;
  isLabelChecked: boolean;
}

export interface NavbarState {
  selectedId: string;
  isNavbarHidden: boolean;
  isLabelBlockVisible: boolean;
}