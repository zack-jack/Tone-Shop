import {
  SET_CURRENT_USER,
  UPDATE_USER_ADDRESS,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  cart: []
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
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};
