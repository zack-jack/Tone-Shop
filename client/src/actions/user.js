import axios from 'axios';

import { SET_CURRENT_USER } from './types';
import authHeaders from './utils/authHeaders';

export const setCurrentUser = () => async dispatch => {
  try {
    // Get request to server to get current user data from token
    await axios.get('/user/current', authHeaders).then(res => {
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
