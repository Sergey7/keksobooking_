const getRandomFloat= (min = 0, max = 10000, decimalPlaces = 0) => {
  if (min >= max || decimalPlaces < 0 || min < 0 || max < 0) {
    return 'Error. Некорректные входные данные';
  }
  decimalPlaces = Math.ceil(decimalPlaces);
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
};

const getRandomInt =  (min = 0, max = 10000) => {
  if (min >= max || min < 0 || max < 0) {
    return 'Error. Некорректные входные данные';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArray = (refArray) => {
  const resultLength = getRandomInt(1, refArray.length - 1);
  const resultArray = [];
  for (let index = 0; index < resultLength; index++) {
    if (getRandomInt(0, 1) === 1) {
      resultArray.push(refArray[index]);
    }
  }
  return (resultArray)?resultArray:resultArray.push(resultArray[1]);
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

export {
  getRandomFloat,
  getRandomInt,
  getRandomArrayElement,
  getRandomArray
};
