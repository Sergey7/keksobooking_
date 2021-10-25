import { createTestPlaceList } from './similar-place.js';
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createTestPlaceList(5));
