import { createPlacesList } from './data.js';
import { createHtmlElement } from './utils.js';

const getTypeOfPlace = (typeData) => {
  const typesDictionary = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  };
  return typesDictionary[typeData];
};

const getCapacityGuests = (guests) => {
  if (guests % 10 === 1) {
    return `${guests} гостя`;
  }
  return `${guests} гостей`;
};

const getCapacityRooms = (rooms) => {
  if (rooms < 20 && rooms > 10) {
    return `${rooms} комнат для `;
  }
  if (rooms % 10 === 1) {
    return `${rooms} комната для `;
  } else if (rooms % 10 < 5 && rooms % 10 > 1) {
    return `${rooms} комнаты для `;
  }
  return `${rooms} комнат для `;
};

const hiddenElement = (card, elementClass) => {
  card.querySelector(elementClass).classList.add('hidden');
};

const fillTextContent = (card, elementClass, text) => {
  if (text) {
    card.querySelector(elementClass).textContent = text;
  } else {
    hiddenElement(card, elementClass);
  }
};

const getPhotos = (card, photosData) => {
  const popupPhotos = card.querySelector('.popup__photos');
  const photoTemplate = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(photoTemplate);
  const photoGallery = document.createDocumentFragment();
  photosData.forEach((photoData) => {
    const img = photoTemplate.cloneNode(true);
    img.src = photoData;
    photoGallery.appendChild(img);
  });
  return photoGallery;
};

const getFeatures = (card, featuresData) => {
  const popupFeatures = card.querySelector('.popup__features');
  popupFeatures.innerHtml = '';

  const featuresFragment = document.createDocumentFragment();
  const featureTemplate = createHtmlElement('li', 'popup__feature');

  featuresData.forEach((featureData) => {
    const feature = featureTemplate.cloneNode(true);
    feature.classList.add(`popup__feature--${featureData}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

const appendFragment = (card, elementClass, data, fragment) => {
  if (data.length !== 0) {
    card.querySelector(elementClass).appendChild(fragment);
  } else {hiddenElement(card, elementClass);}
};

const fillCard = (card, {author, offer}) => {
  const avatar = card.querySelector('.popup__avatar');
  (author.avatar)? avatar.src = author.avatar: hiddenElement(card, '.popup__avatar');
  fillTextContent(card, '.popup__title', offer.title);
  fillTextContent(card, '.popup__text--address', offer.address);
  fillTextContent(card, '.popup__text--price', `${offer.price} Р/ночь`);
  fillTextContent(card, '.popup__description', offer.description);
  fillTextContent(card, '.popup__type', getTypeOfPlace(offer.type));
  (offer.rooms && offer.guests) ? fillTextContent(card, '.popup__text--capacity', `${getCapacityRooms(offer.rooms)} ${getCapacityGuests(offer.guests)}`) : hiddenElement(card, '.popup__text--capacity');
  (offer.checkin && offer.checkout) ? fillTextContent(card, '.popup__text--time', `'Заезд после ${offer.checkin} выезд до ${offer.checkout}`) : hiddenElement(card, '.popup__text--time');

  appendFragment(card, '.popup__photos', offer.photos, getPhotos(card, offer.photos));
  appendFragment(card, '.popup__features', offer.features, getFeatures(card, offer.features));

};


const createTestPlaceList = (similarPlacesCount) => {
  const testDataPlaceList = createPlacesList(similarPlacesCount);
  const similarPlaceTemplate = document.querySelector('#card').content.querySelector('.popup');
  const testPlaceList =  testDataPlaceList.reduce((similarPlaces, similarPlace) => {
    const placeCard = similarPlaceTemplate.cloneNode(true);
    fillCard(placeCard, similarPlace);
    similarPlaces.appendChild(placeCard);
    return similarPlaces;
  }, document.createDocumentFragment());
  return testPlaceList;
};

export {fillCard, createTestPlaceList, getTypeOfPlace};
