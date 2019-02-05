import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Image, Header, Button } from 'semantic-ui-react';

import { setCurrentProduct } from '../../actions/products';

class ProductCard extends Component {
  handleViewItem = e => {
    // Get current product id
    const id = e.target.parentNode.getAttribute('_id');

    // Set the current product data in redux
    this.props.setCurrentProduct(id).then(() => {
      // Redirect to the product id view
      this.props.history.push(`/product/${id}`);
    });
  };

  handleAddToCart = () => {};

  render() {
    return (
      <Card>
        <Card.Content textAlign="center" _id={this.props.product._id}>
          <Card.Header className="product-card__header">
            {this.props.product.name}
          </Card.Header>
          <Card.Meta className="product-card__meta">
            {this.props.product.brand.name}
          </Card.Meta>
          <Image src={this.props.product.images[0]} />

          <Header>{`$ ${this.props.product.price.toFixed(2)}`}</Header>

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
        </Card.Content>
      </Card>
    );
  }
}

export default compose(
  connect(
    null,
    { setCurrentProduct }
  ),
  withRouter
)(ProductCard);
