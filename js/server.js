import { putMarkersOnMap } from './map.js';
import { createHtmlElement } from './utils.js';

const onErrorDataLoading = () => {
  const errorMessage = createHtmlElement('p', 'error-text');
  errorMessage.textContent = 'Попытка загрузить данные с сервера провалилась. Список похожих объявлений недоступен. Проверьте интернет cоединение и обновите страницу.';
  const errorBlock = createHtmlElement('div', 'error-block');
  errorBlock.appendChild(errorMessage);
  const map = document.querySelector('.map');
  map.appendChild(errorBlock);
  setTimeout(() => {
    errorBlock.remove();
  }, 5000);
};

const fetchDataFromServer = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((places) => putMarkersOnMap(places))
    .catch(() => onErrorDataLoading());
};

fetchDataFromServer();

export { fetchDataFromServer };
