import axios from 'axios';

import {
  GET_ALL_PRODUCTS,
  GET_BRANDS,
  GET_BODY_TYPES,
  GET_WOOD_TYPES,
  GET_PICKUP_TYPES,
  GET_BEST_SELLERS,
  GET_NEW_ARRIVALS
} from './types';

// Fetches all products
export const getAllProducts = () => async dispatch => {
  try {
    const response = await axios.get('product/items');

    // Dispatch best sellers to redux
    dispatch({ type: GET_ALL_PRODUCTS, payload: response.data.products });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

// Fetches all brands
export const getBrands = () => async dispatch => {
  try {
    const response = await axios.get('product/brands');

    // Dispatch best sellers to redux
    dispatch({ type: GET_BRANDS, payload: response.data.brands });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

// Fetches all body types
export const getBodyTypes = () => async dispatch => {
  try {
    const response = await axios.get('product/bodies');

    // Dispatch best sellers to redux
    dispatch({ type: GET_BODY_TYPES, payload: response.data.bodies });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

// Fetches all wood types
export const getWoodTypes = () => async dispatch => {
  try {
    const response = await axios.get('product/woods');

    // Dispatch best sellers to redux
    dispatch({ type: GET_WOOD_TYPES, payload: response.data.woods });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

// Fetches all pickup types
export const getPickupTypes = () => async dispatch => {
  try {
    const response = await axios.get('product/pickups');

    // Dispatch best sellers to redux
    dispatch({ type: GET_PICKUP_TYPES, payload: response.data.pickups });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

// Fetches the top 3 best selling items by number sold
export const getBestSellers = limit => async dispatch => {
  try {
    const response = await axios.get(
      `product/items?sortBy=sold&order=desc&limit=${limit}`
    );

    // Dispatch best sellers to redux
    dispatch({ type: GET_BEST_SELLERS, payload: response.data.products });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

// Fetches the top 3 newest products based on createdAt date
export const getNewArrivals = limit => async dispatch => {
  try {
    const response = await axios.get(
      `product/items?sortBy=createdAt&order=desc&limit=${limit}`
    );

    // Dispatch best sellers to redux
    dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.products });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};
