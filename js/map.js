import {activateForm, setCoordinates, submitData, DEFAULT_COORDINATES} from './form.js';
import { fillCard } from './similar-place.js';

const MAX_SIMILAR_PLACE = 10;

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);


const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  setCoordinates(coordinates.lat, coordinates.lng);
});

mainPinMarker.addTo(mapCanvas);

const createBallon = (point) => {
  const similarPlaceTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarPlace = similarPlaceTemplate.cloneNode(true);
  fillCard(similarPlace, point);
  return similarPlace;
};

const Filters = (type, filterValue, pointsArr) => {
  switch (type) {
    case 'type' : return pointsArr.filter((point) => point.offer.type === filterValue);
    case 'rooms' : return pointsArr.filter((point) => point.offer.rooms === +filterValue);
    case 'guests' : return pointsArr.filter((point) => point.offer.guests <= +filterValue);
    case 'features' : return pointsArr.filter((point) => filterValue.map((feature) => point.offer.features.includes(feature)).every((bul) => bul === true));
    case 'price' : {
      switch (filterValue) {
        case 'low': return pointsArr.filter((point) => point.offer.price <= 10000);
        case 'middle': return pointsArr.filter((point) => (point.offer.price > 10000 && point.offer.price < 50000));
        case 'high': return pointsArr.filter((point) => point.offer.price >= 50000);
      }
    }
  }
};


const filterPins = (pointsArr, filters) => {
  let newFilterArr = [...pointsArr];
  console.log('newFilterArr0', newFilterArr);
  for (const filter in filters) {
    if(filters[filter] === 'any' || filters[filter].length === 0) {
      continue;
    } else {
      newFilterArr = Filters(filter, filters[filter], newFilterArr);
    }
  }
  console.log('newFilterArr', newFilterArr);
  return newFilterArr;
};

const getFilterValues = () => {
  const formFilter = document.querySelector('.map__filters');
  const typePlace = formFilter.querySelector('#housing-type');
  const pricePlace = formFilter.querySelector('#housing-price');
  const roomsPlace = formFilter.querySelector('#housing-rooms');
  const guestsPlace = formFilter.querySelector('#housing-guests');
  const featuresPlace = formFilter.querySelector('#housing-features').querySelectorAll('input:checked');
  const featuresPlaceValues = Array.from(featuresPlace).map((feature) => feature.value);
  const allValueFilters = {
    type: typePlace.value,
    price: pricePlace.value,
    rooms: roomsPlace.value,
    guests: guestsPlace.value,
    features: featuresPlaceValues,
  };
  return allValueFilters;
};

const removeOldPins = () => {
  const oldPins = document.querySelectorAll('.similar-marker');
  const oldPopup = document.querySelector('.leaflet-popup');
  oldPins.forEach((pin) => pin.remove());
  if (oldPopup) {oldPopup.remove();}
};


const putMarkersOnMap = (pointsArr) => {
  removeOldPins();
  const activeFilter = getFilterValues();
  const matchingPins = filterPins(pointsArr, activeFilter);

  matchingPins.slice(0, MAX_SIMILAR_PLACE)
    .forEach((point) => {
      const plainPinIcon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const plainPinMarker = L.marker(
        {
          lat: point.location.lat,
          lng: point.location .lng,
        },
        {
          icon: plainPinIcon,
        },
      );
      plainPinMarker.addTo(mapCanvas).bindPopup(createBallon(point));
      L.DomUtil.addClass(plainPinMarker._icon, 'similar-marker');
    });
};

submitData(mainPinMarker);


export { putMarkersOnMap };
