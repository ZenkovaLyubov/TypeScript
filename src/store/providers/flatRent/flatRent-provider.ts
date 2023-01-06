import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { IPlace as FlatRentPlace, IPlace } from "../../../IPlace";
import { FlatRentSdk } from "../../../flat-rent-sdk.js";

export class FlatRentProvider implements Provider {
  getById(id: string): Promise<Place> {
    throw new Error(`Method not implemented. ${id}`);
  }

  public static provider = "flatRent";

  public find(filter: SearchFilter): Promise<Place[]> {
    const frs = new FlatRentSdk();

    const parameters = {
      city: "Санкт-Петербург",
      checkInDate: new Date(filter.checkIn),
      checkOutDate: new Date(filter.checkOut),
      priceLimit: filter.price,
    };

    return new Promise((resolve) => {
      const response = frs.search(parameters);
      resolve(response);
    }).then((result: any) => {
      const iplace: FlatRentPlace[] = [];

      if (result) {
        result.forEach((el) => {
          iplace.push({
            id: el["id"],
            image: el["photos"][0],
            name: el["title"],
            description: el["details"],
            bookedDates: el["bookedDates"],
            price: el["totalPrice"],
            remoteness: 5,
          });
        });
      }

      return this.convertPlaceListResponse(iplace);
    });
  }

  private convertPlaceListResponse(response: IPlace[]): Place[] {
    const placesList: Place[] = [];
    for (const key in response) {
      placesList.push(this.convertPlaceResponse(response[key]));
    }
    return placesList;
  }

  private convertPlaceResponse(item: FlatRentPlace): Place {
    return new Place(
      FlatRentProvider.provider,
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
