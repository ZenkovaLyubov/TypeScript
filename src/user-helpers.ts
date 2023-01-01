import { User } from './classUser.js';
import { getLocalStorage } from "./search-results";
import { PlaceList } from "./IPlace.js";

export function getUserData() {
  //////занесли тестовые данные в локалСторидж
  window.localStorage.setItem(
    "user",
    '{"userName": "Марина В.", "avatarUrl": "/img/avatar.png"}'
  );
  /////////////////
  const user: unknown = JSON.parse(window.localStorage.getItem("user"));
  Object.setPrototypeOf(user, User.prototype);
  if (user instanceof User) {
    return user;
  } else {
    throw new Error("User not found.");
  }
}

export function getFavoritesAmount(): number {
  //////занесли тестовые данные в локалСторидж
  // window.localStorage.setItem('favoritesAmount', '5');
  ////////////////////
  const favPlaces = <PlaceList[]>(
    JSON.parse(localStorage.getItem("favoriteItems"))
  );
  ///////////////////////
  // const favPlaces = getLocalStorage("favoriteItems");
  // if (favPlaces) {
  //   return favPlaces.length;
  // } else {
  //   return 0;
  // }
  /////////////////////////
  // console.log("favPlaces ", favPlaces);
  // if (favPlaces) {
  //   const indexFavPlace = Number(favPlaces.find((x) => x.id === idel)?.id);
  //   if (!indexFavPlace) {
  //     console.log("test");
  //     favPlaces.push(elemFavorites);
  //     localStorage.setItem("favoriteItems", JSON.stringify(favPlaces));
  //   }
  // } else {
  //   localStorage.setItem("favoriteItems", JSON.stringify([elemFavorites]));
  // }
  if (favPlaces) {
    return favPlaces.length;
  } else {
    return 0;
  }
}
