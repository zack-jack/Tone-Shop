import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

class ProductHeader extends Component {
  state = {
    brands: this.props.products.brands,
    categories: this.props.products.bodies
  };

  handleDropdownClick = () => {
    this.props.history.push('/browse');
  };

  renderCategories = categories =>
    categories.map(category => (
      <Dropdown.Item key={category._id}>{category.name}</Dropdown.Item>
    ));

  renderBrands = brands =>
    brands.map(brand => (
      <Dropdown.Item key={brand._id}>{brand.name}</Dropdown.Item>
    ));

  render() {
    return (
      <Menu
        attached="top"
        borderless
        color="red"
        inverted
        className="product-header"
      >
        <Menu.Item as="a">New Arrivals</Menu.Item>
        <Menu.Item as="a">Best Sellers</Menu.Item>

        <Menu.Item as="a" onClick={() => this.props.history.push('/browse')}>
          Browse Guitars
        </Menu.Item>

        <Dropdown
          item
          simple
          icon={null}
          text="Categories"
          onClick={this.handleDropdownClick}
          className="product-header__dropdown"
        >
          <Dropdown.Menu>
            {this.renderCategories(this.state.categories)}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          item
          simple
          icon={null}
          text="Brands"
          className="product-header__dropdown"
        >
          <Dropdown.Menu>{this.renderBrands(this.state.brands)}</Dropdown.Menu>
        </Dropdown>
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
    null
  ),
  withRouter
)(ProductHeader);
