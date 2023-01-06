import { Place } from "../../domain/place.js";
import { HttpHelper } from "../../utils/http-helper.js";
export class HomyProvider {
    // private static apiUrl = `${this.host}/places?checkInDate=${this.dateIngetTime}&coordinates=59.9386,30.3141&checkOutDate=${this.dateOutgetTime}&maxPrice=price`;
    //////////////////////////////////
    find(filter) {
        console.log("filter3", filter);
        return HttpHelper.fetchAsJson(HomyProvider.host +
            "/places?" +
            // создадим соответствующую строку запроса из объекта фильтра
            this.convertFilterToQueryString(filter)).then((response) => {
            // проверим, что с ответ корректный
            this.assertIsValidResponse(response);
            // сконвертируем JSON-ответ в экземпляры Book
            return this.convertPlaceListResponse(response);
        });
    }
    getById(id) {
        return HttpHelper.fetchAsJson(HomyProvider.host + "/place/" + id).then((response) => {
            // проверим, что с ответ корректный
            this.assertIsValidResponse(response); // сконвертируем JSON-ответ в экземпляр Book
            return this.convertPlaceResponse(response.item);
        });
    }
    /**
     * Данный провайдер не использует http коды для ответов
     * В случае ошибки, она содержится в errorMessage
     * Необходимо убедиться, что ответ не является ошибкой
     */
    assertIsValidResponse(response) {
        if (response.errorMessage != null) {
            throw new Error(response.errorMessage);
        }
    }
    convertFilterToQueryString(filter) {
        return (`checkInDate=${filter.checkIn}&coordinates=59.9386,30.3141` +
            `&checkOutDate=${filter.checkOut}&maxPrice=${filter.price}`);
    }
    convertPlaceListResponse(response) {
        console.log("response", response);
        console.log("response.items", response.items);
        const placesList = [];
        for (const key in response) {
            console.log("response.items2", response[key]);
            placesList.push(this.convertPlaceResponse(response[key]));
        }
        console.log("placesList Homy", placesList);
        return placesList;
        // return response.items.map((item) => {
        //   return this.convertPlaceResponse(item);
        // });
    }
    convertPlaceResponse(item) {
        return new Place(HomyProvider.provider, String(item.id), item.image, item.name, item.description, item.bookedDates, item.price, item.remoteness);
    }
}
// имя провайдера нужно, чтобы было возможно установить источник того или
// иного экземпляра книги
HomyProvider.provider = "homy";
// URL API не настоящий, для примера
// private static apiUrl = 'https://fake-api.ozon.ru/v1'
// private static dateIn = new Date();
// private static dateOut = new Date(
//   this.dateIn.getTime() + 24 * 60 * 60 * 1000
// );
// private static dateIngetTime = this.dateIn.getTime();
// private static dateOutgetTime = this.dateOut.getTime();
// price = 10000;
// const iplace: IPlace[] = [];
HomyProvider.host = "http://localhost:3030";
