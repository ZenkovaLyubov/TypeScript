import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import { User } from './classUser.js';
import { getUserData, getFavoritesAmount } from './user-helpers.js';

window.addEventListener('DOMContentLoaded', () => {
  const user: User = getUserData();
  const favoritesAmount = getFavoritesAmount();

  renderUserBlock(user.userName, user.avatarUrl, favoritesAmount);

  /////даты добавлены ддля проверки работы функции из дз1
  // const dateIn = new Date(new Date('2022-11-28'));
  // const dateOut = new Date(new Date('2022-12-02'));
  // renderSearchFormBlock(dateIn, dateOut);
  renderSearchFormBlock();

  renderSearchStubBlock();
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто');
      },
    }
  );
});
