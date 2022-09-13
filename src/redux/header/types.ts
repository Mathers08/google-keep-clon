import { drive, google, mail, maps, market, youtube } from "../../assets";

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
  isServicesPopupVisible: boolean;
  searchValue: string;
  isNoteListRow: boolean;
}

type SettingsItem = {
  id: number;
  item: SettingsEnum
}

type ServicesItem = {
  id: number;
  src: string;
  title: string;
  href: string;
}

export const settingsItems: SettingsItem[] = [
  {
    id: 0,
    item: SettingsEnum.SETTINGS
  },
  {
    id: 1,
    item: SettingsEnum.DISABLE_DARK_THEME
  },
  {
    id: 2,
    item: SettingsEnum.POST_REVIEW
  },
  {
    id: 3,
    item: SettingsEnum.REFERENCE
  },
  {
    id: 4,
    item: SettingsEnum.DOWNLOAD_APP
  },
  {
    id: 5,
    item: SettingsEnum.SHORTCUTS
  }
];
export const servicesItems: ServicesItem[] = [
  {
    id: 0,
    src: google,
    title: 'Поиск',
    href: 'https://google.com'
  },
  {
    id: 1,
    src: market,
    title: 'Play',
    href: 'https://google.com/store/'
  },
  {
    id: 2,
    src: drive,
    title: 'Диск',
    href: 'https://google.com/drive/'
  },
  {
    id: 3,
    src: maps,
    title: 'Карта',
    href: 'https://google.com/maps/'
  },
  {
    id: 4,
    src: youtube,
    title: 'YouTube',
    href: 'https://youtube.com'
  },
  {
    id: 5,
    src: mail,
    title: 'Почта',
    href: 'https://google.com/mail/'
  }
];
