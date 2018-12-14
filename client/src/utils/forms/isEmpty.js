export default (formData, formName) => {
  let isEmptyArray = [];
  let isEmpty;

  for (let key in formData) {
    isEmptyArray.push(formData[key].value);
  }

  isEmpty = isEmptyArray.some(element => {
    return element === '';
  });

  return isEmpty;
};
