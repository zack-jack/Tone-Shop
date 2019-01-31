import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Divider } from 'semantic-ui-react';

import {
  getAllProducts,
  getBestSellers,
  getNewArrivals
} from '../../../actions/products';

import Filters from './Filters';
import ProductsGrid from './ProductsGrid';
import PaginationMenu from './PaginationMenu';

class BrowseProducts extends Component {
  state = {
    products: this.props.products.allProducts,
    itemsPerPage: 9,
    currentPage: 1,
    productsToShow: []
  };

  componentDidMount() {
    // Get all products and dispatch to redux
    this.props.getAllProducts();

    // Split products into initial items to display
    const productsToShow = this.state.products.slice(
      0,
      this.state.itemsPerPage
    );

    this.setState({ productsToShow });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.products.allProducts });
  }

  handlePageChange = targetPageNum => {
    this.setState({ currentPage: targetPageNum });

    // Define indices to split
    const startIndex =
      targetPageNum === 1 ? 0 : (targetPageNum - 1) * this.state.itemsPerPage;
    const endIndex =
      targetPageNum === 1
        ? targetPageNum * this.state.itemsPerPage
        : targetPageNum * this.state.itemsPerPage;

    // Split the group of products by number of items to display per page
    const productsToShow = this.state.products.slice(startIndex, endIndex);

    // Set state with new grouped array
    this.setState({ productsToShow });
  };

  render() {
    return (
      <Container fluid className="browse">
        <Header as="h5">Browse Products</Header>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Filters />
          </Grid.Column>

          <Grid.Column>
            <ProductsGrid products={this.state.productsToShow} />
            <Divider hidden />
            <PaginationMenu
              numItems={this.state.products.length}
              itemsPerPage={this.state.itemsPerPage}
              handlePageChange={this.handlePageChange.bind(this)}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getAllProducts, getBestSellers, getNewArrivals }
)(BrowseProducts);
