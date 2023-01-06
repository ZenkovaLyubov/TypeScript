import { IPlace } from "../../../IPlace.js";
/**
 * Ответ с несколькими
 */
export interface PlaceListResponse {
  errorMessage?: string;
  items: IPlace[];
}
/**
 * Ответ с одной книгой
 */
export interface PlaceResponse {
  errorMessage?: string;
  item: IPlace;
}
/**
 * Структура самой книги
 */
