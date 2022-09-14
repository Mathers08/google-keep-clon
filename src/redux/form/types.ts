import {
  celebration,
  celebrationB,
  eat,
  eatB,
  music,
  musicB,
  notes,
  notesB,
  places,
  placesB,
  products,
  productsB,
  recipes,
  recipesB,
  transparent,
  travels,
  travelsB,
  video,
  videoB
} from "../../assets";

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
  GREY = "rgb(60, 63, 67)"
}

export enum MiniImagesEnum {
  DEFAULT = transparent,
  PRODUCTS = products,
  EAT = eat,
  TRAVELS = travels,
  VIDEO = video,
  RECIPES = recipes,
  CELEBRATION = celebration,
  PLACES = places,
  NOTES = notes,
  MUSIC = music,
}

export enum ImagesEnum {
  DEFAULT = transparent,
  PRODUCTS = productsB,
  EAT = eatB,
  TRAVELS = travelsB,
  VIDEO = videoB,
  RECIPES = recipesB,
  CELEBRATION = celebrationB,
  PLACES = placesB,
  NOTES = notesB,
  MUSIC = musicB,
}

export interface FormState {
  id: string;
  headerText: string;
  isColorBlockVisible: boolean;
  formColor: ColorsEnum;
  formImage: ImagesEnum;
  isNotePined: boolean;
  isTextareaVisible: boolean;
}