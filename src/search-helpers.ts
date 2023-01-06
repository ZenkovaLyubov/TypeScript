import { ISearchFormData } from "./ISearchFormData.js";

export type namesFields = "checkin" | "checkout" | "price";

export function funcSearch(formData: ISearchFormData) {
  console.log(formData);
}
