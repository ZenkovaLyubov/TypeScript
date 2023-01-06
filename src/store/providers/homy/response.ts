import { IPlace } from "../../../IPlace.js";

export interface PlaceListResponse {
  errorMessage?: string;
  items: IPlace[];
}

export interface PlaceResponse {
  errorMessage?: string;
  item: IPlace;
}
