import { IPlace } from "../../../IPlace.js";

export interface PlaceListResponse {
  items: IPlace[];
  errorMessage?: string;
}

export interface PlaceResponse {
  item: IPlace;
  errorMessage?: string;
}
