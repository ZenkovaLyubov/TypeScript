import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { HttpHelper } from "../../utils/http-helper.js";
import { PlaceResponse, PlaceListResponse } from "./response.js";
import { IPlace as HomyPlace } from "../../../IPlace";

export class HomyProvider implements Provider {
  public static provider = "homy";

  private static host = "http://localhost:3030";

  public find(filter: SearchFilter): Promise<Place[]> {
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      HomyProvider.host + "/places?" + this.convertFilterToQueryString(filter)
    ).then((response) => {
      this.assertIsValidResponse(response);
      return this.convertPlaceListResponse(response);
    });
  }

  public getById(id: string): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(
      HomyProvider.host + "/place/" + id
    ).then((response) => {
      this.assertIsValidResponse(response);
      return this.convertPlaceResponse(response.item);
    });
  }

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
    const placesList: Place[] = [];
    for (const key in response) {
      placesList.push(this.convertPlaceResponse(response[key]));
    }
    return placesList;
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
