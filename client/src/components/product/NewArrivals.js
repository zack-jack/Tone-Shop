import React, { Component } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';

import ProductCard from './ProductCard';

class NewArrivals extends Component {
  state = {
    products: this.props.products
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products });
  }

  renderProductCards = ({ newArrivals }) =>
    newArrivals.map(product => (
      <Grid.Column key={product._id}>
        <ProductCard product={product} />
      </Grid.Column>
    ));

  render() {
    return (
      <Container className="landing__new-arrivals">
        <Header
          as="h2"
          textAlign="center"
          className="landing__new-arrivals-heading"
        >
          New Arrivals
        </Header>
        <Grid columns={3} stackable>
          {this.props.products
            ? this.renderProductCards(this.props.products)
            : null}
        </Grid>
      </Container>
    );
  }
}

export default NewArrivals;
