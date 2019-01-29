import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Input, Icon } from 'semantic-ui-react';

import { signOut } from '../../actions/auth';

class Header extends Component {
  state = {
    authToken: this.props.authToken,
    isAuth: false
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
              <Icon name="cart" />
              {item}
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
      <Menu secondary>
        <Menu.Item as="a" name="logo" onClick={this.handleLogoClick}>
          Tone Shop
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        {this.renderNavItems()}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  };
};

export default compose(
  connect(
    mapStateToProps,
    { signOut }
  ),
  withRouter
)(Header);
