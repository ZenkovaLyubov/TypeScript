import { User } from "./classUser.js";
import { PlaceList } from "./IPlace.js";

export function getUserData() {
  //////занесли тестовые данные в локалСторидж
  window.localStorage.setItem(
    "user",
    '{"userName": "Марина В.", "avatarUrl": "/img/avatar.png"}'
  );
  /////////////////
  const strUser = window.localStorage.getItem("user");
  if (strUser) {
    const user: unknown = JSON.parse(strUser);
    Object.setPrototypeOf(user, User.prototype);
    if (user instanceof User) {
      return user;
    } else {
      throw new Error("User not found.");
    }
  }
}

export function getFavoritesAmount(): number | null {
  const strFavPlace = localStorage.getItem("favoriteItems");
  if (strFavPlace) {
    const favPlaces = <PlaceList[]>JSON.parse(strFavPlace);
    if (favPlaces) {
      return favPlaces.length;
    } else {
      return 0;
    }
  }
  return null;
}
