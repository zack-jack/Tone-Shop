import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  Grid,
  Image,
  Form,
  Button
} from 'semantic-ui-react';

import { updateCart, removeFromCart } from '../../actions/user';

class Cart extends Component {
  state = {
    cart: this.props.cart,
    quantities: []
  };

  componentDidMount() {
    // Set quantities state for each item
    const quantities = this.state.cart.map(item => item.quantity);

    this.setState({ quantities });
  }

  componentDidUpdate(prevProps, nextProps) {
    console.log(prevProps, nextProps);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ cart: nextProps.cart });
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

    const newQuantities = this.state.cart.map(item => item.quantity);

    this.setState({ quantities: newQuantities });
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

              <Form className="cart-page__quantity">
                <Form.Input
                  name={i}
                  size="mini"
                  type="number"
                  value={this.state.quantities[i]}
                  style={{ maxWidth: '4rem' }}
                  onChange={this.onQuantityChange}
                />
                <Form.Button basic size="tiny" onClick={this.updateQuantity}>
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
        {this.renderCartItems()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.user.cart
  };
};

export default connect(
  mapStateToProps,
  { updateCart, removeFromCart }
)(Cart);
