import { SET_CURRENT_USER, UPDATE_USER_ADDRESS } from '../actions/types';

const INITIAL_STATE = {
  data: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        addressMessages: action.payload
      };
    default:
      return state;
  }
};
