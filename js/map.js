import {activateForm, setCoordinates } from './form.js';
import { fillCard } from './similar-place.js';
import { createPlacesList } from './data.js';


const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.67500,
    lng: 139.75000,
  }, 13);

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
    lat: 35.67500,
    lng: 139.75000,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.on('moveend', (evt) => {
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


const putMarkersOnMap = (pointsArr) => {
  pointsArr.forEach((point) => {
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
  });
};

const numOfPlaces = 20;
const points = createPlacesList(numOfPlaces);
putMarkersOnMap(points);