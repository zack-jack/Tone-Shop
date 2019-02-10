import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import ProductCard from '../ProductCard';

class ProductsGrid extends Component {
  state = {
    products: this.props.products
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  renderProducts = products =>
    products && products.length === 0 ? (
      <p>No results found.</p>
    ) : (
      products &&
      products.map(product => (
        <Grid.Column
          key={product._id}
          tablet={14}
          computer={6}
          largeScreen={5}
          widescreen={5}
        >
          <ProductCard product={product} products={products.allProducts} />
        </Grid.Column>
      ))
    );

  render() {
    return (
      <Grid columns={3} className="product__grid">
        {this.renderProducts(this.state.products)}
      </Grid>
    );
  }
}

export default ProductsGrid;
