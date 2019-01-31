import React from 'react';
import { Accordion, Menu } from 'semantic-ui-react';

import FilterForm from './FilterForm';

const FilterCategory = props => {
  return (
    <Menu.Item>
      <Accordion.Title
        active={props.active}
        content={props.content}
        index={props.index}
        onClick={props.onClick}
      />
      <Accordion.Content
        active={props.active}
        content={
          <FilterForm
            options={props.options}
            handleChecked={props.handleChecked}
          />
        }
      />
    </Menu.Item>
  );
};

export default FilterCategory;
