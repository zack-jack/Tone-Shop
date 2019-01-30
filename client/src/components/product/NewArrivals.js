import React, { Component } from 'react';
import { Container, Header, Card } from 'semantic-ui-react';

import ProductCard from './ProductCard';

class NewArrivals extends Component {
  state = {
    products: this.props.products
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  renderProductCards = ({ newArrivals }) =>
    newArrivals.map(product => <ProductCard product={product} />);

  render() {
    return (
      <Container className="landing__new-arrivals">
        <Header as="h2" textAlign="center">
          New Arrivals
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

export default NewArrivals;
