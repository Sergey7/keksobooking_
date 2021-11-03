const FILTER_FORM = document.querySelector('.map__filters');
const SELECT_FILTERS = FILTER_FORM.querySelectorAll('select');
const CHECKBOX_FILTER = FILTER_FORM.querySelector('fieldset');

const resetFilter = () => {
  SELECT_FILTERS.forEach((select) => select.querySelector('option').selected = true);
  CHECKBOX_FILTER.querySelectorAll('input').forEach((checkbox) => checkbox.checked = false);
};

const deactivateFilter = () => {
  FILTER_FORM.classList.add('ad-form--disabled');
  SELECT_FILTERS.forEach((select) => select.disabled = true);
  CHECKBOX_FILTER.querySelectorAll('input').forEach((checkbox) => checkbox.disabled = true);
};


const activateFilter = () => {
  FILTER_FORM.classList.remove('ad-form--disabled');
  SELECT_FILTERS.forEach((select) => select.disabled = false);
  CHECKBOX_FILTER.querySelectorAll('input').forEach((checkbox) => checkbox.disabled = false);
};


const mapFilter = document.querySelectorAll('.map__filter');
const features = document.querySelector('#housing-features');

const filterTypeSimilarPlace = (cb) => {
  mapFilter.forEach((filter) => filter.addEventListener('change', (evt) => {
    cb(evt.target.value);
  }));
  features.addEventListener('change', (evt) => {
    cb(evt.target.value);
  });
};


export {activateFilter, resetFilter, deactivateFilter, filterTypeSimilarPlace };
