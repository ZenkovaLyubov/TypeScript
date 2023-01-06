import { User } from "./classUser.js";
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
  const favPlaces = <PlaceList[]>(
    JSON.parse(localStorage.getItem("favoriteItems"))
  );
  if (favPlaces) {
    return favPlaces.length;
  } else {
    return 0;
  }
}
