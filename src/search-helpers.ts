import { Place } from './typescript-homy-api/src/place/Place';
import { namesFields } from './search-helpers';
import { ISearchFormData } from './ISearchFormData.js';
import { renderSearchResultsBlock } from './search-results.js';
import { Place } from './IPlace.js';
import { PlaceList } from './IPlace.js';
export type namesFields = 'checkin' | 'checkout' | 'price';

export function funcSearch(formData: ISearchFormData) {
  console.log(formData);
  searchApi(formData);
}
const host = 'http://localhost:3030';
async function searchApi(formData: ISearchFormData) {
  const dateIn = new Date(formData['checkin']).getTime();
  const dateOut = new Date(formData['checkout']).getTime();

  const url = `${host}/places?checkInDate=${dateIn}&coordinates=59.9386,30.3141&checkOutDate=${dateOut}&maxPrice=${formData['price']}`;

  const response = await fetch(url);
  if (response.ok) {
    const json = await (<IPlace>response.json());

    renderSearchResultsBlock(json);
  } else {
    alert('Ошибка HTTP: ' + response.status);
  }
}
