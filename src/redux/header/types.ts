export enum SettingsEnum {
  SETTINGS = 'Настройки',
  DISABLE_DARK_THEME = 'Отключить тёмную тему',
  POST_REVIEW = 'Отправить отзыв',
  REFERENCE = 'Справка',
  DOWNLOAD_APP = 'Скачать приложение',
  SHORTCUTS = 'Быстрые клавиши'
}

export interface HeaderState {
  isSettingsPopupVisible: boolean;
  searchValue: string;
  isNoteListRow: boolean;
}