export default (element, FormData = []) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      element.value
    );
    const message = !valid ? 'Please provide a valid email address' : '';
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = !valid ? 'This field is required' : '';
    error = !valid ? [valid, message] : error;
  }

  return error;
};
