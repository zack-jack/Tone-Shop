import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import { addOrderToHistory, removeFromCart } from '../../actions/user';

class Checkout extends Component {
  state = {
    cart: this.props.cart,
    currentUser: this.props.user,
    orders: this.props.orders
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      cart: nextProps.cart,
      currentUser: nextProps.user,
      orders: nextProps.orders
    });
  }

  onToken = (token, addresses) => {
    this.props
      .addOrderToHistory(
        this.state.currentUser,
        addresses,
        token,
        this.state.cart,
        this.state.orders
      )
      .then(order => {
        // Empty cart
        this.state.cart.forEach(item =>
          this.props.removeFromCart(item._id, this.state.cart)
        );

        this.props.history.push(`/${order.orderNumber}/thanks`);
      });
  };

  render() {
    return (
      <StripeCheckout
        billingAddress
        label="Checkout"
        name="Tone Shop"
        shippingAddress
        stripeKey={this.props.stripeKey}
        token={this.onToken}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.user.cart,
    orders: state.user.orders,
    user: state.user.data
  };
};

export default compose(
  connect(
    mapStateToProps,
    { addOrderToHistory, removeFromCart }
  ),
  withRouter
)(Checkout);
