import { ISearchFormData } from './ISearchFormData.js';

export type namesFields = 'checkin' | 'checkout' | 'price';

export function funcSearch(formData: ISearchFormData): void {
  console.log(formData);
}
