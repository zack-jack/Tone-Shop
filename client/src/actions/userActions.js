import axios from 'axios';

import { LOGIN_USER } from './userTypes';

export const loginUser = dataToSubmit => {
  const request = axios
    .post('api/user/login', dataToSubmit)
    .then(res => res.data);
  return {
    type: LOGIN_USER,
    payload: request
  };
};
