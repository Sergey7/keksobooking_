import { syncRoomsAndGuests } from './form.js';
import './map.js';
import  {fetchDataFromServer} from './server.js';
import { putMarkersOnMap } from './map.js';
import { filterTypeSimilarPlace } from './filter.js';

syncRoomsAndGuests(1);

fetchDataFromServer((places) => {
  putMarkersOnMap(places);
  filterTypeSimilarPlace(() => putMarkersOnMap(places));
});
