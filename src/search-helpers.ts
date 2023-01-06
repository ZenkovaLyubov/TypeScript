import { ISearchFormData } from "./ISearchFormData.js";
import { renderSearchResultsBlock } from "./search-results.js";
import { IPlace } from "./IPlace.js";
import { FlatRentSdk } from "./flat-rent-sdk.js";

export type namesFields = "checkin" | "checkout" | "price";

export function funcSearch(formData: ISearchFormData) {
  console.log(formData);
  searchApi(formData);
}
const host = "http://localhost:3030";

async function searchApi(formData: ISearchFormData) {
  const dateIn = new Date(formData["checkin"]).getTime();
  const dateOut = new Date(formData["checkout"]).getTime();

  const iplace: IPlace[] = [];
  if (formData["provider"].find((i) => i === "homy")) {
    const url = `${host}/places?checkInDate=${dateIn}&coordinates=59.9386,30.3141&checkOutDate=${dateOut}&maxPrice=${formData["price"]}`;

    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();

      json.forEach((el) => {
        iplace.push(el);
      });
      iplace.forEach((el) => {
        el.id = el.id.toString();
      });
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
  if (formData["provider"].find((i) => i === "flat-rent")) {
    const frs = new FlatRentSdk();
    const parameters = {
      city: "Санкт-Петербург",
      checkInDate: new Date(formData["checkin"]),
      checkOutDate: new Date(formData["checkout"]),
      priceLimit: Number(formData["price"]),
    };

    const searchFrs = await frs.search(parameters);

    if (searchFrs) {
      searchFrs.forEach((el) => {
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
  }
  renderSearchResultsBlock(iplace);
}
