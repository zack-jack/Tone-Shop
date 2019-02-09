import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import {
  getAllProducts,
  getNewArrivals,
  getBestSellers
} from '../../actions/products';

class ProductHeader extends Component {
  state = {
    products: this.props.products,
    newArrivals: this.props.newArrivals,
    bestSellers: this.props.bestSellers
  };

  handleMenuItemClick = e => {
    if (e.target.href.includes('new')) {
      this.props.getNewArrivals(4);
    } else if (e.target.href.includes('bestsellers')) {
      this.props.getBestSellers(15);
    } else {
      this.props.getAllProducts();
    }
  };

  render() {
    return (
      <Menu
        attached="top"
        borderless
        color="red"
        inverted
        className="product-header"
      >
        <Menu.Item
          as={Link}
          to="/browse/new"
          onClick={this.handleMenuItemClick}
          className="product-header__link"
        >
          New Arrivals
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/browse/bestsellers"
          onClick={this.handleMenuItemClick}
          className="product-header__link"
        >
          Best Sellers
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/browse"
          onClick={this.handleMenuItemClick}
          className="product-header__link"
        >
          Browse All Guitars
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getAllProducts, getNewArrivals, getBestSellers }
  ),
  withRouter
)(ProductHeader);
