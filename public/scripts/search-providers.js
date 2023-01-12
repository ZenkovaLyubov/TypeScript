import { FlatRentProvider } from "./store/providers/flatRent/flatRent-provider.js";
import { HomyProvider } from "./store/providers/homy/homy-provider.js";
import { renderSearchResultsBlock } from "./search-results.js";
const homy = new HomyProvider();
const flatRent = new FlatRentProvider();
export function funcSearchProviders(dataRows) {
    var _a;
    const dateIn = (dataRows["checkInDate"] ? new Date(dataRows["checkInDate"]) : new Date()).getTime();
    const dateOut = new Date((_a = dataRows["checkOutDate"]) !== null && _a !== void 0 ? _a : "").getTime();
    const filter = {
        checkIn: dateIn,
        checkOut: dateOut,
        price: Number(dataRows["price"]),
    };
    function sortByPrice(one, two) {
        if (one.price > two.price) {
            return 1;
        }
        else if (one.price < two.price) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortByRemoteness(one, two) {
        if (one.remoteness && two.remoteness) {
            if (one.remoteness > two.remoteness) {
                return 1;
            }
            else if (one.remoteness < two.remoteness) {
                return -1;
            }
            else {
                return 0;
            }
        }
        return 0;
    }
    Promise.all([homy.find(filter), flatRent.find(filter)]).then((results) => {
        if (results[0] && results[1]) {
            const allResults = [].concat(results[0], results[1]);
            renderSearchResultsBlock(allResults);
            allResults.sort(sortByPrice);
            allResults.sort(sortByRemoteness);
        }
    });
}
