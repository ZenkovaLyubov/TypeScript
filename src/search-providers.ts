import { Place } from "./store/domain/place.js";
import { SearchFilter } from "./store/domain/search-filter.js";
import { FlatRentProvider } from "./store/providers/flatRent/flatRent-provider.js";
import { HomyProvider } from "./store/providers/homy/homy-provider.js";
import { ISearchFormData } from "./ISearchFormData.js";
import { renderSearchResultsBlock } from "./search-results.js";
const homy = new HomyProvider();
const flatRent = new FlatRentProvider();

export function funcSearchProviders(dataRows: ISearchFormData) {

  const dateIn = (
    dataRows["checkInDate"] ? new Date(dataRows["checkInDate"]) : new Date()
  ).getTime();
  const dateOut = new Date(dataRows["checkOutDate"] ?? "").getTime();
  const filter: SearchFilter = {
    checkIn: dateIn,
    checkOut: dateOut,
    price: Number(dataRows["price"]),
  };

  function sortByPrice(one: Place, two: Place) {
    if (one.price > two.price) {
      return 1;
    } else if (one.price < two.price) {
      return -1;
    } else {
      return 0;
    }
  }
  function sortByRemoteness(one: Place, two: Place): number {
    if (one.remoteness && two.remoteness) {
      if (one.remoteness > two.remoteness) {
        return 1;
      } else if (one.remoteness < two.remoteness) {
        return -1;
      } else {
        return 0;
      }
    }
    return 0;
  }

  Promise.all([homy.find(filter), flatRent.find(filter)]).then((results) => {
    if (results[0] && results[1]) {
      const allResults: Place[] = [].concat(
        <never>results[0],
        <never>results[1]
      );

      renderSearchResultsBlock(allResults);

      allResults.sort(sortByPrice);
      allResults.sort(sortByRemoteness);
    }
  });
}
