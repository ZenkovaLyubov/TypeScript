import { ISearchFormData } from "./ISearchFormData.js";

// export type namesFields = "checkin" | "checkout" | "price";
// export type namesFields = "checkInDate" | "checkOutDate" | "price" | "provider";
export type namesFields = "checkInDate" | "checkOutDate" | "price";

export function funcSearch(formData: ISearchFormData) {
  console.log(formData);
}
