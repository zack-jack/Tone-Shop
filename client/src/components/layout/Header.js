import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Form, Icon } from 'semantic-ui-react';

import { signOut } from '../../actions/auth';
import { setCurrentProduct, setSearchResults } from '../../actions/products';

class Header extends Component {
  state = {
    allProducts: this.props.allProducts,
    authToken: this.props.authToken,
    brands: this.props.brands,
    cart: this.props.cart,
    isAuth: false,
    searchQuery: ''
  };

  componentDidMount() {
    // Check auth state on load
    if (this.props.authToken !== '') {
      this.setState({ isAuth: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check if the redux authToken updates
    if (nextProps.authToken !== this.state.authToken) {
      // Update state with new props
      this.setState({ authToken: nextProps.authToken });
    }

    // Check if changes to shopping cart
    if (this.state.cart !== nextProps.cart) {
      this.setState({ cart: nextProps.cart });
    }

    // Check if auth token is not empty string
    if (nextProps.authToken !== '') {
      this.setState({ isAuth: true });
    }
  }

  handleLogoClick = e => {
    this.props.history.push('/');
  };

  handleNavItemClick = (e, { name }) => {
    if (name === 'signout') {
      // Log the user out
      this.props.signOut();

      // Reset local component state
      this.setState({ authToken: '', isAuth: false });

      // Redirect to the sign in page
      this.props.history.push('/signin');
    } else {
      // Navigate to clicked button
      this.props.history.push(`/${name}`);
    }
  };

  handleSearchInputChange = (e, { name, value }) =>
    this.setState({ [name]: value });

  handleSearchSubmit = e => {
    e.preventDefault();

    const searchQuery = this.state.searchQuery.toLowerCase();

    // Loop through array and check names against search query
    const brands = this.state.brands.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery)
    );
    const products = this.state.allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery)
    );

    if (products.length > 0 || (products.length > 0 && brands.length > 0)) {
      // Products search yielded results
      if (products.length === 1) {
        // One single product returned
        this.props.setCurrentProduct(products[0]._id);

        // Redirect to product page
        this.props.history.push(`/product/${products[0]._id}`);
      } else {
        this.props.setSearchResults(products);
        this.props.history.push('/browse/results');
      }
    } else if (brands.length > 0 && products.length === 0) {
      // Search for brand to display
      this.props.history.push(`/browse/brand/${brands[0]._id}`);
    } else {
      // No results found
    }
  };

  renderNavItems = () => {
    const navItems = this.state.isAuth
      ? ['Cart', 'Account', 'Sign Out']
      : ['Cart', 'Sign In'];

    return navItems.map(item => {
      // Remove spaces between words and lowercase
      const formattedItem = item.replace(/\s+/g, '').toLowerCase();

      return (
        <Menu.Item
          key={formattedItem}
          as="a"
          name={formattedItem}
          onClick={this.handleNavItemClick}
        >
          {item === 'Cart' ? (
            <span>
              <Icon.Group style={{ marginRight: '0.5rem' }}>
                <Icon name="cart" size="large" />
                {this.state.cart && this.state.cart.length > 0 ? (
                  <Icon color="red" corner="top right" name="circle" />
                ) : null}
              </Icon.Group>
              {this.state.cart && this.state.cart.length > 0
                ? `${item} (${this.state.cart.length})`
                : item}
            </span>
          ) : (
            item
          )}
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Menu secondary className="user-header">
        <Link to="/" className="header__logo">
          Tone
          <Icon name="headphones" className="header__logo-icon" /> Shop
        </Link>

        <div className="user-header__links">
          <Menu.Item>
            <Form onSubmit={this.handleSearchSubmit}>
              <Form.Input
                action={{ icon: 'search' }}
                placeholder="Search..."
                name="searchQuery"
                value={this.state.search}
                onChange={this.handleSearchInputChange}
              />
            </Form>
          </Menu.Item>
          {this.renderNavItems()}
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts,
    authToken: state.auth.authToken,
    brands: state.products.brands,
    cart: state.user.cart
  };
};

export default compose(
  connect(
    mapStateToProps,
    { setCurrentProduct, setSearchResults, signOut }
  ),
  withRouter
)(Header);
