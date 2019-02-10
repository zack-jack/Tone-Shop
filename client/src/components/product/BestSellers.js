import React, { Component } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';

import ProductCard from './ProductCard';

class BestSellers extends Component {
  state = {
    products: this.props.products
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  renderProductCards = ({ bestSellers }) =>
    bestSellers.map(product => (
      <Grid.Column key={product._id} tablet={5}>
        <ProductCard product={product} />
      </Grid.Column>
    ));

  render() {
    return (
      <Container className="landing__best-sellers">
        <Header
          as="h2"
          textAlign="center"
          className="landing__best-sellers-heading"
        >
          Best Sellers
        </Header>
        <Grid centered columns={3} stackable>
          {this.props.products
            ? this.renderProductCards(this.props.products)
            : null}
        </Grid>
      </Container>
    );
  }
}

export default BestSellers;
