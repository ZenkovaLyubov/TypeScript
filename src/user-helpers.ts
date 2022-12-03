import { User } from './classUser.js';

export function getUserData() {
  //////занесли тестовые данные в локалСторидж
  window.localStorage.setItem(
    'user',
    '{"userName": "Марина В.", "avatarUrl": "/img/avatar.png"}'
  );
  /////////////////
  const user: unknown = JSON.parse(window.localStorage.getItem('user'));
  Object.setPrototypeOf(user, User.prototype);
  if (user instanceof User) {
    return user;
  } else {
    throw new Error('User not found.');
  }
}

export function getFavoritesAmount() {
  //////занесли тестовые данные в локалСторидж
  window.localStorage.setItem('favoritesAmount', '5');
  ////////////////////
  return Number(window.localStorage.getItem('favoritesAmount'));
}
