import axios from 'axios';

import { GET_BEST_SELLERS, GET_NEW_ARRIVALS } from './types';

// Fetches the top 3 best selling items by number sold
export const getBestSellers = () => async dispatch => {
  try {
    const response = await axios.get(
      'product/items?sortBy=sold&order=desc&limit=3'
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
export const getNewArrivals = () => async dispatch => {
  try {
    const response = await axios.get(
      'product/items?sortBy=createdAt&order=desc&limit=3'
    );

    // Dispatch best sellers to redux
    dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.products });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};
