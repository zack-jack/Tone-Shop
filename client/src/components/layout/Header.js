import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';

class Header extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item as="a">Cart</Menu.Item>
        <Menu.Item as="a">Sign In</Menu.Item>
        <Menu.Item as="a">Account</Menu.Item>
        <Menu.Item as="a">Sign Out</Menu.Item>
      </Menu>
    );
  }
}

export default Header;
