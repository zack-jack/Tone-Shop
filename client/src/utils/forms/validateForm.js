export default (formData, formName) => {
  let validArray = [];
  let validData;

  for (let key in formData) {
    validArray.push(formData[key].valid);
  }

  validData = validArray.every(element => {
    return element === true;
  });

  return validData;
};
