import { getTypeOfPlace } from './similar-place.js';
const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const minPriceToType = {
  bungalow: 0,
  flat: 1000,
  hotel: 7500,
  house: 5000,
  palace: 10000,
};

const price = form.querySelector('#price');
const type = form.querySelector('#type');

const checkPriceValidity = () => {
  if (price.validity.rangeUnderflow) {
    const customAlert = `Стоимость для размещения типа "${getTypeOfPlace(type.value)}" должна быть больше ${price.min}.`;
    price.setCustomValidity(customAlert);
  } else if (price.validity.rangeOverflow) {
    const customAlert = `Стоимость за ночь не может превышать ${price.max}.`;
    price.setCustomValidity(customAlert);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
};

type.addEventListener('change', (evt) => {
  price.placeholder = minPriceToType[evt.target.value];
  price.min = minPriceToType[evt.target.value];
  checkPriceValidity();
});

price.addEventListener('input', () => {
  checkPriceValidity();
});

const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');

timein.addEventListener('change', (evt) => {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', (evt) => {
  timein.value = evt.target.value;
});

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((adFormElement) => {
    adFormElement.disabled = true;
  });
  filterForm.classList.add('ad-form--disabled');
  filterForm.querySelectorAll('select').forEach((filterFormElement) => {
    filterFormElement.disabled = true;
  });
  filterForm.querySelector('fieldset').disabled = true;
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((adFormElement) => {
    adFormElement.disabled = false;
  });
  filterForm.classList.remove('ad-form--disabled');
  filterForm.querySelectorAll('select').forEach((filterFormElement) => {
    filterFormElement.disabled = false;
  });
  filterForm.querySelector('fieldset').disabled = false;
};

const setCoordinates = (lat, lng) => {
  const addressField = form.querySelector('#address');
  addressField.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

const title = form.querySelector('#title');
title.addEventListener('input', () => {
  if (title.validity.tooShort) {
    const customAlert = `Заголовок объявления должен быть длиной не менее ${title.minLength} симв. Пожалуйста, добавьте ${title.minLength - title.value.length} симв.`;
    title.setCustomValidity(customAlert);
  } else if (title.validity.tooLong) {
    const customAlert = `Заголовок объявления должен быть длиной не более ${title.maxLength} симв. Пожалуйста, уберите ${title.value.length - title.maxLength} симв.`;
    title.setCustomValidity(customAlert);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});


const roomsFieldset = form.querySelector('#room_number');
const guestsFieldset = form.querySelector('#capacity');
const guestOptions = guestsFieldset.querySelectorAll('option');


const syncRoomsAndGuests = (value) => {
  const map = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };
  guestsFieldset.innerHTML = '';
  const customAlert = 'Доступное количество гостей изменилось в связи с выбранным количеством комнат.';
  guestsFieldset.setCustomValidity(customAlert);
  guestsFieldset.reportValidity();
  for (const option of map[value]) {
    guestsFieldset.append(guestOptions[option]);
  }
};

roomsFieldset.addEventListener('change', (evt) => {
  syncRoomsAndGuests(evt.target.value);
});

deactivateForm();

export {deactivateForm, activateForm, setCoordinates};
