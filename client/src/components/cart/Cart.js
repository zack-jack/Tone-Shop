import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Header,
  Segment,
  Grid,
  Image,
  Form,
  Button,
  Divider
} from 'semantic-ui-react';

import { updateCart, removeFromCart } from '../../actions/user';
import Checkout from './Checkout';

class Cart extends Component {
  state = {
    auth: this.props.auth,
    cart: this.props.cart,
    quantities: []
  };

  componentDidMount() {
    // Set quantities state for each item
    const quantities = this.state.cart.map(item => item.quantity);

    this.setState({ quantities });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ cart: nextProps.cart }, () => {
      const newQuantities = this.state.cart.map(item => item.quantity);

      this.setState({ quantities: newQuantities });
    });
  }

  onQuantityChange = (e, { name, value }) => {
    if (value >= 0) {
      const newQuantities = this.state.quantities.map((quantity, i) =>
        i === name ? parseInt(value) : quantity
      );

      this.setState({ quantities: newQuantities });
    }
  };

  removeItem = e => {
    const id = e.target.getAttribute('_id');

    this.props.removeFromCart(id, this.state.cart);
  };

  updateQuantity = e => {
    this.props.updateCart(this.state.cart, this.state.quantities);
  };

  getCartTotal = () => {
    let total;

    if (this.state.cart.length > 0) {
      const prices = this.state.cart.map(
        item => item.product.price * item.quantity
      );
      total = prices.reduce((acc, current) => acc + current);
    } else {
      total = 0;
    }

    return total;
  };

  handleCheckout = () => {
    if (this.state.auth) {
      this.props.history.push('/checkout');
    } else {
      this.props.history.push('/signin');
    }
  };

  renderCartItems = () =>
    this.state.cart.map((item, i) => {
      return (
        <Segment key={item.product._id}>
          <Grid>
            <Grid.Column width={3}>
              <Image src={item.product.images[0]} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header>{item.product.name}</Header>
              <p>
                ${(item.product.price.toFixed(2) * item.quantity).toFixed(2)}
              </p>

              <Form
                className="cart-page__quantity"
                onSubmit={this.updateQuantity}
              >
                <Form.Input
                  name={i}
                  size="mini"
                  type="number"
                  value={this.state.quantities[i]}
                  style={{ maxWidth: '4rem' }}
                  onChange={this.onQuantityChange}
                />
                <Form.Button basic size="tiny">
                  Update Quantity
                </Form.Button>
              </Form>

              <Button
                basic
                _id={item.product._id}
                size="tiny"
                onClick={this.removeItem}
              >
                Remove Item
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    });

  render() {
    return (
      <Container fluid className="cart-page">
        <Header as="h2">Cart</Header>
        {this.state.cart.length === 0 ? (
          <>
            <Divider hidden />
            <p>Cart is empty.</p>
            <Divider hidden />
            <Header>Total: ${this.getCartTotal().toFixed(2)}</Header>
          </>
        ) : (
          <>
            {this.renderCartItems()}
            <Header>Total: ${this.getCartTotal().toFixed(2)}</Header>
            <Checkout stripeKey={this.props.stripeKey} />
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.authenticated,
    cart: state.user.cart
  };
};

export default compose(
  connect(
    mapStateToProps,
    { updateCart, removeFromCart }
  ),
  withRouter
)(Cart);
