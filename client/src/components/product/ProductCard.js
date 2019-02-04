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
        <Image src={this.props.product.images[0]} />
        <Card.Content textAlign="center" _id={this.props.product._id}>
          <Card.Header>{this.props.product.name}</Card.Header>
          <Card.Meta>{this.props.product.brand.name}</Card.Meta>
          <Header>{`$ ${this.props.product.price.toFixed(2)}`}</Header>

          <Button color="red" onClick={this.handleAddToCart}>
            Add to Cart
          </Button>
          <Button basic color="red" onClick={this.handleViewItem}>
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
