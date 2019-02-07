import axios from 'axios';

import {
  SET_CURRENT_USER,
  UPDATE_USER_ADDRESS,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  ADD_ORDER_TO_HISTORY,
  GET_USER_ORDER_HISTORY
} from './types';

export const setCurrentUser = () => async dispatch => {
  try {
    // Get request to server to get current user data from token
    await axios
      .get('/user/current', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
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

export const updateUserAddress = (userId, formData) => async dispatch => {
  try {
    if (
      Object.entries(formData).length === 0 &&
      formData.constructor === Object
    ) {
      // Dispatch empty payload to redux to reset props
      dispatch({ type: UPDATE_USER_ADDRESS, payload: formData });
    } else {
      // Post form data to update user address in database
      const response = await axios.post('/user/update', { userId, formData });

      // Dispatch update of user address with the form data
      dispatch({ type: UPDATE_USER_ADDRESS, payload: response.data });

      return response;
    }
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const addToCart = (
  product,
  prevCart,
  idExistsInCart
) => async dispatch => {
  try {
    let nextCart = [];

    if (prevCart.length === 0) {
      nextCart = [product];
    }

    if (prevCart && prevCart.length > 0) {
      if (idExistsInCart) {
        // Get everything in cart except for the current target product
        const cartLessCurrentProd = prevCart.filter(item =>
          item._id === product._id ? false : true
        );

        // Update cart with current product that has updated quantity
        nextCart = cartLessCurrentProd.concat(product);
      } else {
        // Targeted product hasn't been added to cart
        nextCart = prevCart.concat(product);
      }
    }

    // Dispatch product id to add to redux store user cart state
    dispatch({ type: ADD_TO_CART, payload: nextCart });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const updateCart = (prevCart, newQuantities) => async dispatch => {
  try {
    const updatedCart = prevCart.map((item, i) => {
      if (newQuantities[i] === 0) {
        return {};
      } else {
        return {
          _id: item._id,
          product: item.product,
          quantity: newQuantities[i]
        };
      }
    });

    // Remove empty objects with 0 quantity
    const newCart = updatedCart.filter(item => {
      if (Object.entries(item).length === 0 && item.constructor === Object) {
        return false;
      } else {
        return item;
      }
    });

    // Dispatch updated cart to redux store user cart state
    dispatch({ type: UPDATE_CART, payload: newCart });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const removeFromCart = (idToRemove, prevCart) => async dispatch => {
  try {
    const newCart = prevCart.filter(item => item._id !== idToRemove);

    // Dispatch updated cart to redux store user cart state
    dispatch({ type: REMOVE_FROM_CART, payload: newCart });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const addOrderToHistory = (
  user,
  addresses,
  payment,
  cart,
  orders
) => async dispatch => {
  try {
    const orderNumber = payment.created
      .toString()
      .concat(Math.floor(Math.random() * 100).toString());
    const prices = cart.map(item => item.product.price * item.quantity);
    const total = prices.reduce((acc, current) => acc + current);
    const order = { orderNumber, user, addresses, payment, cart, total };

    await axios.post(`/user/order/${orderNumber}`, order);

    let newOrders = [];

    if (orders.length > 0) {
      newOrders = orders.concat(order);
    } else {
      newOrders = [order];
    }

    dispatch({ type: ADD_ORDER_TO_HISTORY, payload: newOrders });

    return order;
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const getUserOrderHistory = () => async dispatch => {
  try {
    const orders = await axios
      .get('/user/orders', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
        // Return orders array
        return res.data;
      })
      .catch(err => console.log(err));

    dispatch({ type: GET_USER_ORDER_HISTORY, payload: orders });
  } catch (err) {
    if (err) {
      return err;
    }
  }
};
