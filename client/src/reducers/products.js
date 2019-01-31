import {
  GET_BEST_SELLERS,
  GET_NEW_ARRIVALS,
  GET_ALL_PRODUCTS
} from '../actions/types';

const INITIAL_STATE = {
  allProducts: [],
  bestSellers: [],
  newArrivals: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
      };
    case GET_BEST_SELLERS:
      return {
        ...state,
        bestSellers: action.payload
      };
    case GET_NEW_ARRIVALS:
      return {
        ...state,
        newArrivals: action.payload
      };
    default:
      return state;
  }
};
