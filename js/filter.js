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

deactivateFilter();

export {activateFilter, resetFilter };
