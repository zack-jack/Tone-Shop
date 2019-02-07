import {
  SET_CURRENT_USER,
  UPDATE_USER_ADDRESS,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  ADD_ORDER_TO_HISTORY,
  GET_USER_ORDER_HISTORY
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  cart: [],
  orders: []
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
    case ADD_ORDER_TO_HISTORY:
      return {
        ...state,
        orders: action.payload
      };
    case GET_USER_ORDER_HISTORY:
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
};
