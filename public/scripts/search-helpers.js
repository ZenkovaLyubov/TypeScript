var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderSearchResultsBlock } from './search-results.js';
export function funcSearch(formData) {
    console.log(formData);
    searchApi(formData);
}
const host = 'http://localhost:3030';
function searchApi(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const dateIn = new Date(formData['checkin']).getTime();
        const dateOut = new Date(formData['checkout']).getTime();
        const url = `${host}/places?checkInDate=${dateIn}&coordinates=59.9386,30.3141&checkOutDate=${dateOut}&maxPrice=${formData['price']}`;
        const response = yield fetch(url);
        if (response.ok) {
            const json = yield response.json();
            renderSearchResultsBlock(json);
        }
        else {
            alert('Ошибка HTTP: ' + response.status);
        }
    });
}
