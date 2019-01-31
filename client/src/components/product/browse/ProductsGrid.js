import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import ProductCard from '../ProductCard';

class ProductsGrid extends Component {
  state = {
    products: this.props.products
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  renderProducts = products =>
    products.length === 0 ? (
      <p>No results found.</p>
    ) : (
      products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))
    );

  render() {
    return (
      <Card.Group itemsPerRow={3}>
        {this.renderProducts(this.state.products)}
      </Card.Group>
    );
  }
}

export default ProductsGrid;
