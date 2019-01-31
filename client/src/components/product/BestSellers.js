import React, { Component } from 'react';
import { Container, Header, Card } from 'semantic-ui-react';

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
      <ProductCard key={product._id} product={product} />
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
        <Card.Group centered>
          {this.props.products
            ? this.renderProductCards(this.props.products)
            : null}
        </Card.Group>
      </Container>
    );
  }
}

export default BestSellers;
