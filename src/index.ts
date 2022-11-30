import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Мария В.', '/img/avatar.png', 0);
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
