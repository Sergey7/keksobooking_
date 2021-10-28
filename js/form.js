import { getTypeOfPlace } from './similar-place.js';
import { resetFilter } from './filter.js';

const DEFAULT_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000,
};

const AD_FORM = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const TITLE = AD_FORM.querySelector('#title');
const TYPE = AD_FORM.querySelector('#type');
const PRICE = AD_FORM.querySelector('#price');
const MIN_PRICE_TO_TYPE  = {
  bungalow: 0,
  flat: 1000,
  hotel: 7500,
  house: 5000,
  palace: 10000,
};
const TIME_FIELDSET = AD_FORM.querySelector('.ad-form__element--time');
const ROOMS_FIELDSET = AD_FORM.querySelector('#room_number');
const ADDRESS_FIELD = AD_FORM.querySelector('#address');
const MAIN = document.querySelector('main');

TITLE.addEventListener('input', () => {
  if (TITLE.validity.tooShort) {
    const customAlert = `Заголовок объявления должен быть длиной не менее ${TITLE.minLength} симв. Пожалуйста, добавьте ${TITLE.minLength - TITLE.value.length} симв.`;
    TITLE.setCustomValidity(customAlert);
  } else if (TITLE.validity.tooLong) {
    const customAlert = `Заголовок объявления должен быть длиной не более ${TITLE.maxLength} симв. Пожалуйста, уберите ${TITLE.value.length - TITLE.maxLength} симв.`;
    TITLE.setCustomValidity(customAlert);
  } else {
    TITLE.setCustomValidity('');
  }
  TITLE.reportValidity();
});

const checkPriceValidity = () => {
  if (PRICE.validity.rangeUnderflow) {
    const customAlert = `Стоимость для размещения типа "${getTypeOfPlace(PRICE.value)}" должна быть больше ${PRICE.min}.`;
    PRICE.setCustomValidity(customAlert);
  } else if (PRICE.validity.rangeOverflow) {
    const customAlert = `Стоимость за ночь не может превышать ${PRICE.max}.`;
    PRICE.setCustomValidity(customAlert);
  } else {
    PRICE.setCustomValidity('');
  }
  PRICE.reportValidity();
};

PRICE.addEventListener('input', () => {
  checkPriceValidity();
});

const setPriceToType = (value) => {
  PRICE.placeholder = MIN_PRICE_TO_TYPE[value];
  PRICE.min = MIN_PRICE_TO_TYPE[value];
};


TYPE.addEventListener('change', (evt) => {
  setPriceToType(evt.target.value);
  checkPriceValidity();
});

const setCheckInOutTime = (data) => {
  const timein = TIME_FIELDSET.querySelector('#timein');
  const timeout = TIME_FIELDSET.querySelector('#timeout');
  timeout.value = data;
  timein.value = data;
};

TIME_FIELDSET.addEventListener('change', (evt) => {
  setCheckInOutTime(evt.target.value);
});


const syncRoomsAndGuests = (value) => {
  const guestsFieldset = AD_FORM.querySelector('#capacity');
  const guestOptions = guestsFieldset.querySelectorAll('option');
  //Вложить объекты
  const roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  guestOptions.forEach((field) => {
    if (roomsToGuests[value].includes(field.value)) {
      field.selected = true;
      field.disabled = false;
    } else {
      field.disabled = true;
    }
  });
};

ROOMS_FIELDSET.addEventListener('change', (evt) => {
  syncRoomsAndGuests(evt.target.value);
});

const deactivateForm = () => {
  AD_FORM.classList.add('ad-form--disabled');
  AD_FORM.querySelectorAll('fieldset').forEach((adFormElement) => {
    adFormElement.disabled = true;
  });
  filterForm.classList.add('ad-form--disabled');
  filterForm.querySelectorAll('select').forEach((filterFormElement) => {
    filterFormElement.disabled = true;
  });
  filterForm.querySelector('fieldset').disabled = true;
};

const activateForm = () => {
  AD_FORM.classList.remove('ad-form--disabled');
  AD_FORM.querySelectorAll('fieldset').forEach((adFormElement) => {
    adFormElement.disabled = false;
  });
  filterForm.classList.remove('ad-form--disabled');
  filterForm.querySelectorAll('select').forEach((filterFormElement) => {
    filterFormElement.disabled = false;
  });
  filterForm.querySelector('fieldset').disabled = false;
};

const setCoordinates = (lat = DEFAULT_COORDINATES.lat, lng = DEFAULT_COORDINATES.lng) => {
  if (lat === 'reset' ||  lng === 'reset') {
    ADDRESS_FIELD.value = '';
  } else {
    ADDRESS_FIELD.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
  }

};

AD_FORM.addEventListener('reset', (evt) => {
  evt.preventDefault();
  evt.target.reset();
});

const formReset = () => {
  TITLE.value = '';
  TYPE.value = 'house';
  setCoordinates('reset', 'reset');
  PRICE.value = '';
  setPriceToType(TYPE.value);
  syncRoomsAndGuests('1');
  setCheckInOutTime('12:00');
  AD_FORM.querySelector('#avatar').value = '';
  AD_FORM.querySelector('#images').value = '';
  AD_FORM.querySelector('#description').value = '';
  const featuresFieldset = AD_FORM.querySelector('.features');
  const features = featuresFieldset.querySelectorAll('input');
  features.forEach((feature) => {
    feature.checked = false;
  });
};

const onDataSendSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  MAIN.appendChild(successTemplate);
  const removeSuccesTempHadle = (evt) => {
    if (evt.type === 'keydown') {
      if (evt.key === ('Escspe' || 'Esc')) {
        MAIN.removeChild(successTemplate);
      }
    }
    if (evt.type === 'click') {
      MAIN.removeChild(successTemplate);
    }
    window.removeEventListener('click', removeSuccesTempHadle);
    window.removeEventListener('keydown', removeSuccesTempHadle);
  };
  window.addEventListener('click', removeSuccesTempHadle);
  window.addEventListener('keydown', removeSuccesTempHadle);
};

const onDataSendError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const tryAgainButton = errorTemplate.querySelector('.error__button');
  MAIN.appendChild(errorTemplate);

  const removeErrorTempHadle = (evt) => {
    if (evt.type === 'keydown') {
      if (evt.key === ('Escspe' || 'Esc')) {
        MAIN.removeChild(errorTemplate);
      }
    }
    if (evt.type === 'click') {
      MAIN.removeChild(errorTemplate);
    }
    window.removeEventListener('click', removeErrorTempHadle);
    window.removeEventListener('keydown', removeErrorTempHadle);
  };
  tryAgainButton.addEventListener('click', removeErrorTempHadle);
  window.addEventListener('click', removeErrorTempHadle);
  window.addEventListener('keydown', removeErrorTempHadle);
};

const submitData = (mainPin) => {
  AD_FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      'https://22.javascript.pages.academy/keksobooking', {
        method: 'POST',
        type: 'multipart/form-data',
        body: formData,
      })
      .then((response) => response.json())
      .then(() => {
        mainPin.setLatLng([DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lng]);
        onDataSendSuccess();
        resetFilter();
        formReset();
      })
      .catch(() => {
        onDataSendError();
      });
  });
  return true;
};
syncRoomsAndGuests(1);
deactivateForm();

export {deactivateForm, activateForm, setCoordinates, DEFAULT_COORDINATES, submitData};
