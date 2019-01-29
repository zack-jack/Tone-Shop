import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

const ProductHeader = () => {
  return (
    <Menu attached="top" borderless color="red" inverted>
      <Menu.Item as="a">New Arrivals</Menu.Item>
      <Menu.Item as="a">Best Sellers</Menu.Item>

      <Dropdown item simple icon={null} text="Shop Guitars">
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
          <Dropdown.Item>Item 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown item simple icon={null} text="Shop Brands">
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
          <Dropdown.Item>Item 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default ProductHeader;
