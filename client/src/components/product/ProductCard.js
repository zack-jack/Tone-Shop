import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Image, Header, Button } from 'semantic-ui-react';

import { addToCart } from '../../actions/user';
import { getAllProducts, setCurrentProduct } from '../../actions/products';

class ProductCard extends Component {
  state = {
    allProducts: this.props.allProducts,
    cart: this.props.cart
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.cart !== nextProps.cart) {
      this.setState({ cart: nextProps.cart });
    }
  }

  handleViewItem = e => {
    // Get current product id
    const id = e.target.parentNode.parentNode.getAttribute('_id');

    this.props.getAllProducts().then(() => {
      // Set the current product data in redux
      this.props.setCurrentProduct(id).then(() => {
        // Redirect to the product id view
        this.props.history.push(`/product/${id}`);
      });
    });
  };

  handleAddToCart = e => {
    // Get the product id from click event
    const id = e.target.parentNode.parentNode.getAttribute('_id');

    // Get product to add
    const productIdMatch = this.state.allProducts.filter(
      product => product._id === id
    );

    // Check if a product with target id already exists in the cart
    const idExistsInCart = this.state.cart.some(item => item._id === id);

    let productToAdd;

    if (idExistsInCart) {
      // Find index of item that exists in cart and matches target id
      const matchIndex = this.state.cart.findIndex(item => item._id === id);

      productToAdd = {
        _id: id,
        product: productIdMatch[0],
        quantity: this.state.cart[matchIndex].quantity + 1
      };
    } else {
      productToAdd = {
        _id: id,
        product: productIdMatch[0],
        quantity: 1
      };
    }

    // Add item to cart in redux store
    this.props.addToCart(productToAdd, this.state.cart, idExistsInCart);
  };

  render() {
    return (
      <Card centered className="product-card">
        <Card.Content textAlign="center" _id={this.props.product._id}>
          <Card.Header className="product-card__header">
            {this.props.product.name}
          </Card.Header>

          <Image
            src={this.props.product.images[0]}
            className="product-card__image"
          />

          <Header>{`$ ${this.props.product.price.toFixed(2)}`}</Header>

          <div className="product-card__actions">
            <Button
              fluid
              color="red"
              className="product-card__button"
              onClick={this.handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              fluid
              basic
              color="red"
              className="product-card__button"
              onClick={this.handleViewItem}
            >
              View Item
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts,
    cart: state.user.cart
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getAllProducts, setCurrentProduct, addToCart }
  ),
  withRouter
)(ProductCard);
