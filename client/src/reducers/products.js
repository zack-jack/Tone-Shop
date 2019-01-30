import { GET_BEST_SELLERS, GET_NEW_ARRIVALS } from '../actions/types';

const INITIAL_STATE = {
  bestSellers: [],
  newArrivals: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
