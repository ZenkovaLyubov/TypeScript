import { Place } from "../../domain/place.js";
import { FlatRentSdk } from "../../../flat-rent-sdk.js";
export class FlatRentProvider {
    getById(id) {
        throw new Error(`Method not implemented. ${id}`);
    }
    // parameters = {
    //   city: "Санкт-Петербург",
    //   checkInDate: new Date(formData["checkin"]),
    //   checkOutDate: new Date(formData["checkout"]),
    //   priceLimit: Number(formData["price"]),
    // };
    find(filter) {
        console.log("filter31", filter);
        const frs = new FlatRentSdk();
        // const parameters = this.convertFilterToQueryObject(filter);
        const parameters = {
            city: "Санкт-Петербург",
            checkInDate: new Date(filter.checkIn),
            checkOutDate: new Date(filter.checkOut),
            priceLimit: filter.price,
        };
        //////////////////////////
        // let placesList: Place[] = [];
        // return new Promise(() => {
        return new Promise((resolve) => {
            const response = frs.search(parameters);
            resolve(response);
            // return frs.search(parameters);
        }).then((result) => {
            console.log("result", result);
            console.log("response123", result);
            const iplace = [];
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
            // for (const key in result) {
            //   console.log("response.items2", result[key]);
            //   placesList.push(this.convertPlaceResponse(result[key]));
            // }
            return this.convertPlaceListResponse(iplace);
        });
        // return this.convertPlaceListResponse(result);
        // console.log("placesList flatRent", placesList);
        // return placesList;
        //********************* */
        // const placesList: Place[] = [];
        // for (const key in response) {
        //   console.log("response.items2", response[key]);
        //   placesList.push(this.convertPlaceResponse(response[key]));
        // }
        // console.log("placesList Homy", placesList);
        // return placesList;
        //********************* */
        // });
        //////////////////////////
        // return new Promise(() => {
        //   const response = frs.search(parameters);
        //   console.log("response123", response);
        //   const iplace: FlatRentPlace[] = [];
        //   if (response) {
        //     response.forEach((el) => {
        //       iplace.push({
        //         id: el["id"],
        //         image: el["photos"][0],
        //         name: el["title"],
        //         description: el["details"],
        //         bookedDates: el["bookedDates"],
        //         price: el["totalPrice"],
        //       });
        //     });
        //   }
        //   const placesList: Place[] = [];
        //   for (const key in response) {
        //     console.log("response.items2", iplace[key]);
        //     placesList.push(this.convertPlaceResponse(iplace[key]));
        //   }
        //   return placesList;
        // });
    }
    // return new Place(
    //   FlatRentProvider.provider,
    //   String(item.id),
    //   item.image[0],
    //   item.name,
    //   item.description,
    //   item.bookedDates,
    //   item.price,
    //   item.remoteness
    // );
    // this.assertIsValidResponse(response);
    // return this.convertPlaceListResponse(response);
    // if(searchFrs) {
    //   searchFrs.forEach((el) => {
    //     iplace.push({
    //       id: el["id"],
    //       image: el["photos"][0],
    //       name: el["title"],
    //       description: el["details"],
    //       bookedDates: el["bookedDates"],
    //       price: el["totalPrice"],
    //     });
    //   });
    // }
    // private assertIsValidResponse(
    //   response: PlaceListResponse | PlaceResponse
    // ): void {
    //   if (response.errorMessage != null) {
    //     throw new Error(response.errorMessage);
    //   }
    // }
    // private convertFilterToQueryObject(filter: SearchFilter): object {
    //   const parameters = {
    //     city: "Санкт-Петербург",
    //     checkInDate: filter.checkIn,
    //     checkOutDate: filter.checkOut,
    //     priceLimit: filter.price,
    //   };
    //   return parameters;
    // }
    // private convertPlaceListResponse(response: PlaceListResponse): Place[] {
    //   console.log("response", response);
    //   console.log("response.items", response.items);
    //   const placesList: Place[] = [];
    //   for (const key in response) {
    //     console.log("response.items2", response[key]);
    //     placesList.push(this.convertPlaceResponse(response[key]));
    //   }
    //   console.log("placesList flatRent2", placesList);
    //   return placesList;
    // }
    convertPlaceListResponse(response) {
        console.log("response", response);
        const placesList = [];
        for (const key in response) {
            console.log("response.items2", response[key]);
            placesList.push(this.convertPlaceResponse(response[key]));
        }
        console.log("placesList flatRent2", placesList);
        return placesList;
    }
    convertPlaceResponse(item) {
        return new Place(FlatRentProvider.provider, String(item.id), item.image, item.name, item.description, item.bookedDates, item.price, item.remoteness);
    }
}
// имя провайдера нужно, чтобы было возможно установить источник того или
// иного экземпляра книги
FlatRentProvider.provider = "flatRent";
