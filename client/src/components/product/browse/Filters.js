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
      { title: 'Wood', options: ['Wood'] },
      { title: 'Pickups', options: ['Single Coil', 'Humbucker'] }
    ],
    checked: []
  };

  handleCategoryClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleChecked = e => {
    const changed = e.target.innerText;

    const exists = this.state.checked.some(checked => {
      return Object.keys(checked)[0] === changed;
    });

    if (exists) {
      const indexOfExisting = this.state.checked.findIndex(checked => {
        return Object.keys(checked)[0] === changed;
      });
      const changedRemoved = this.state.checked.filter(checked => {
        return Object.keys(checked)[0] !== changed;
      });
      const keyToChange = Object.keys(this.state.checked[indexOfExisting])[0];

      const newChecked = [...changedRemoved, { [keyToChange]: false }];

      this.setState({
        checked: newChecked
      });
    } else {
      this.setState({
        checked: [...this.state.checked, { [changed]: true }]
      });
    }
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
        handleChecked={this.handleChecked}
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
