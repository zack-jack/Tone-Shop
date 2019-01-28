import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authToken: '',
  errors: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authToken: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
