import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { HttpHelper } from "../../utils/http-helper.js";
import { PlaceResponse, PlaceListResponse } from "./response.js";
import { IPlace as HomyPlace } from "../../../IPlace";

export class HomyProvider implements Provider {
  // имя провайдера нужно, чтобы было возможно установить источник того или
  // иного экземпляра книги
  public static provider = "homy";
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
  private static host = "http://localhost:3030";
  // private static apiUrl = `${this.host}/places?checkInDate=${this.dateIngetTime}&coordinates=59.9386,30.3141&checkOutDate=${this.dateOutgetTime}&maxPrice=price`;
  //////////////////////////////////

  public find(filter: SearchFilter): Promise<Place[]> {
    console.log("filter3", filter);
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      HomyProvider.host +
        "/places?" +
        // создадим соответствующую строку запроса из объекта фильтра
        this.convertFilterToQueryString(filter)
    ).then((response) => {
      // проверим, что с ответ корректный
      this.assertIsValidResponse(response);
      // сконвертируем JSON-ответ в экземпляры Book
      return this.convertPlaceListResponse(response);
    });
  }

  public getById(id: string): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(
      HomyProvider.host + "/place/" + id
    ).then((response) => {
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
  private assertIsValidResponse(
    response: PlaceListResponse | PlaceResponse
  ): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage);
    }
  }

  private convertFilterToQueryString(filter: SearchFilter): string {
    return (
      `checkInDate=${filter.checkIn}&coordinates=59.9386,30.3141` +
      `&checkOutDate=${filter.checkOut}&maxPrice=${filter.price}`
    );
  }

  private convertPlaceListResponse(response: PlaceListResponse): Place[] {
    console.log("response", response);
    console.log("response.items", response.items);
    const placesList: Place[] = [];
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

  private convertPlaceResponse(item: HomyPlace): Place {
    return new Place(
      HomyProvider.provider,
      String(item.id),
      item.image,
      item.name,
      item.description,
      item.bookedDates,
      item.price,
      item.remoteness
    );
  }
}
