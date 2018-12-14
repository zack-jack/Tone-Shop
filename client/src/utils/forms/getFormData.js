export default (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value;
  }

  return dataToSubmit;
};
