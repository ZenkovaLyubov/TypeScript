import { Place } from "../../domain/place.js";
import { FlatRentSdk } from "../../../flat-rent-sdk.js";
export class FlatRentProvider {
    getById(id) {
        throw new Error(`Method not implemented. ${id}`);
    }
    find(filter) {
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
        }).then((result) => {
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
            return this.convertPlaceListResponse(iplace);
        });
    }
    convertPlaceListResponse(response) {
        const placesList = [];
        for (const key in response) {
            placesList.push(this.convertPlaceResponse(response[key]));
        }
        return placesList;
    }
    convertPlaceResponse(item) {
        return new Place(FlatRentProvider.provider, String(item.id), item.image, item.name, item.description, item.bookedDates, item.price, item.remoteness);
    }
}
FlatRentProvider.provider = "flatRent";
