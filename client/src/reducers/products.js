import {
  GET_ALL_PRODUCTS,
  GET_BRANDS,
  GET_BODY_TYPES,
  GET_WOOD_TYPES,
  GET_PICKUP_TYPES,
  GET_BEST_SELLERS,
  GET_NEW_ARRIVALS,
  SET_CURRENT_PRODUCT,
  SET_SEARCH_RESULTS
} from '../actions/types';

const INITIAL_STATE = {
  allProducts: [],
  brands: [],
  bodies: [],
  woods: [],
  pickups: [],
  bestSellers: [],
  newArrivals: [],
  currentProduct: {},
  searchResults: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
      };
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      };
    case GET_BODY_TYPES:
      return {
        ...state,
        bodies: action.payload
      };
    case GET_WOOD_TYPES:
      return {
        ...state,
        woods: action.payload
      };
    case GET_PICKUP_TYPES:
      return {
        ...state,
        pickups: action.payload
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
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
};
