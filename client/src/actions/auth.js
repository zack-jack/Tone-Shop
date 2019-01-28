import axios from 'axios';

import { AUTH_USER, AUTH_ERROR, SET_CURRENT_USER } from './types';

export const signIn = (formData, callback) => async dispatch => {
  try {
    let errors = [];

    // Post to server login route with login form data
    const response = await axios.post('/user/login', formData);

    // Check if there were any errors received from server
    if (response.data.message) {
      errors.push(response.data);

      // Dispatch the errors to redux
      dispatch({ type: AUTH_ERROR, payload: errors });
    }

    // Check that there are no errors present before attempting to sign the user in
    if (errors.length === 0) {
      // Assign token to the user
      const token = response.data.token;

      // Dispatch to redux to update authenticated with the token
      dispatch({ type: AUTH_USER, payload: token });

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Execute the callback function
      callback();
    }
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const signUp = (formData, callback) => async dispatch => {
  try {
    // Post to server register route with sign up form data
    const response = await axios.post('/user/register', formData);

    if (response.status === 200) {
      // Dispatch auth token to redux store
      dispatch({ type: AUTH_USER, payload: response.data.token });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Execute the callback function
      callback();
    }
  } catch (err) {
    let errors = [];

    // Check if there were any errors received from server
    if (err) {
      errors = [...err.response.data.errors];

      // Dispatch the errors to redux
      dispatch({ type: AUTH_ERROR, payload: errors });
    }
  }
};

export const signOut = () => dispatch => {
  // Clear auth token from redux store
  dispatch({ type: AUTH_USER, payload: '' });

  // Remove token from localStorage
  localStorage.removeItem('token');

  // Clear current user data
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};

export const clearAuthErrors = () => dispatch => {
  dispatch({ type: AUTH_ERROR, payload: [] });
};
