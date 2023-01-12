import { Place } from "../../domain/place.js";
import { HttpHelper } from "../../utils/http-helper.js";
export class HomyProvider {
    find(filter) {
        return HttpHelper.fetchAsJson(HomyProvider.host + "/places?" + this.convertFilterToQueryString(filter)).then((response) => {
            this.assertIsValidResponse(response);
            return this.convertPlaceListResponse(response);
        });
    }
    getById(id) {
        return HttpHelper.fetchAsJson(HomyProvider.host + "/place/" + id).then((response) => {
            this.assertIsValidResponse(response);
            return this.convertPlaceResponse(response.item);
        });
    }
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
        const placesList = [];
        const listResponse = response;
        for (const key in listResponse) {
            placesList.push(this.convertPlaceResponse(listResponse[key]));
        }
        return placesList;
    }
    convertPlaceResponse(item) {
        return new Place(HomyProvider.provider, String(item.id), item.image, item.name, item.description, item.bookedDates, item.price, item.remoteness);
    }
}
HomyProvider.provider = "homy";
HomyProvider.host = "http://localhost:3030";
