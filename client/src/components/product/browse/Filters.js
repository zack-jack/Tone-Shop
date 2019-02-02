import React, { Component } from 'react';
import { Accordion, Menu } from 'semantic-ui-react';

import FilterCategory from './FilterCategory';

class Filters extends Component {
  state = {
    activeIndices: [],
    categories: [
      {
        title: 'Body Type',
        options: ['Solid body', 'Semi-hollow body', 'Hollow body']
      },
      { title: 'Pickups', options: ['Single Coil', 'Humbucker'] },
      {
        title: 'Brands',
        options: ['Fender', 'Gibson', 'Gretsch', 'PRS', 'Suhr']
      },
      {
        title: 'Price Range',
        options: [
          '$0 - $900',
          '$1000 - $1600',
          '$1700 - $2000',
          '$2100 - $2500',
          '$2600 - $3000',
          '$3100 - $5000'
        ]
      }
    ]
  };

  handleCategoryClick = (e, titleProps) => {
    const exists = this.state.activeIndices.some(active => {
      return active === titleProps.index;
    });

    if (!exists) {
      this.setState({
        activeIndices: this.state.activeIndices.concat(titleProps.index)
      });
    } else {
      // Category was clicked while already open, so set to inactive
      const newActiveIndices = this.state.activeIndices.filter(
        active => active !== titleProps.index
      );

      this.setState({ activeIndices: newActiveIndices });
    }
  };

  renderCategories = categories =>
    categories.map((category, i) => (
      <FilterCategory
        active={this.state.activeIndices.some(active => active === i)}
        content={category.title}
        index={i}
        key={category.title}
        options={category.options}
        onClick={this.handleCategoryClick}
        handleChecked={this.props.handleChecked}
      />
    ));

  render() {
    return (
      <Accordion as={Menu} fluid vertical className="filters">
        {this.renderCategories(this.state.categories)}
      </Accordion>
    );
  }
}

export default Filters;
