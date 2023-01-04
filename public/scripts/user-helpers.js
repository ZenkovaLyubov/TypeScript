import { User } from "./classUser.js";
export function getUserData() {
    //////занесли тестовые данные в локалСторидж
    window.localStorage.setItem("user", '{"userName": "Марина В.", "avatarUrl": "/img/avatar.png"}');
    /////////////////
    const user = JSON.parse(window.localStorage.getItem("user"));
    Object.setPrototypeOf(user, User.prototype);
    if (user instanceof User) {
        return user;
    }
    else {
        throw new Error("User not found.");
    }
}
export function getFavoritesAmount() {
    const favPlaces = (JSON.parse(localStorage.getItem("favoriteItems")));
    if (favPlaces) {
        return favPlaces.length;
    }
    else {
        return 0;
    }
}
