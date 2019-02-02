import React, { Component } from 'react';
import { Accordion, Menu } from 'semantic-ui-react';

import FilterCategory from './FilterCategory';

class Filters extends Component {
  state = {
    activeIndex: 0,
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
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderCategories = categories =>
    categories.map((category, i) => (
      <FilterCategory
        active={this.state.activeIndex === i}
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
