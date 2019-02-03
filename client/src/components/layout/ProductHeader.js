import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { getNewArrivals, getBestSellers } from '../../actions/products';

class ProductHeader extends Component {
  state = {
    products: this.props.products,
    newArrivals: this.props.newArrivals,
    bestSellers: this.props.bestSellers
  };

  handleMenuItemClick = e => {
    if (e.target.href.includes('new')) {
      this.props.getNewArrivals(4);
    }

    if (e.target.href.includes('bestsellers')) {
      this.props.getBestSellers(15);
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
        >
          New Arrivals
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/browse/bestsellers"
          onClick={this.handleMenuItemClick}
        >
          Best Sellers
        </Menu.Item>

        <Menu.Item as={Link} to="/browse" onClick={this.handleMenuItemClick}>
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
    { getNewArrivals, getBestSellers }
  ),
  withRouter
)(ProductHeader);
