import axios from 'axios';

import { SET_CURRENT_USER, UPDATE_USER_ADDRESS } from './types';

export const setCurrentUser = () => async dispatch => {
  try {
    // Get request to server to get current user data from token
    await axios
      .get('/user/current', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
        const user = res.data.user;

        // Dispatch current user data to redux store
        dispatch({ type: SET_CURRENT_USER, payload: user });
      });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const updateUserAddress = (userId, formData) => async dispatch => {
  try {
    if (
      Object.entries(formData).length === 0 &&
      formData.constructor === Object
    ) {
      // Dispatch empty payload to redux to reset props
      dispatch({ type: UPDATE_USER_ADDRESS, payload: formData });
    } else {
      // Post form data to update user address in database
      const response = await axios.post('/user/update', { userId, formData });

      // Dispatch update of user address with the form data
      dispatch({ type: UPDATE_USER_ADDRESS, payload: response.data });

      return response;
    }
  } catch (err) {
    if (err) {
      return err;
    }
  }
};
