import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class ProductHeader extends Component {
  handleDropdownClick = () => {
    this.props.history.push('/browse');
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
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
            <Dropdown.Item>Item 4</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          item
          simple
          icon={null}
          text="Brands"
          className="product-header__dropdown"
        >
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
            <Dropdown.Item>Item 4</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default ProductHeader;
